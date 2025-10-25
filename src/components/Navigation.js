import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useDispatch } from "react-redux";
import { logout } from "../store";
import { useNavigate } from "react-router-dom";

const Nav = styled.nav`
  background-color: ${(props) => props.theme.colors.background};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const NavBrand = styled(Link)`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.primaryHover};
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLink = styled(Link)`
  padding: 0.5rem 1rem;
  color: ${(props) => props.theme.colors.text.secondary};
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colors.text.primary};
    background-color: ${(props) => props.theme.colors.surface};
  }

  ${(props) =>
    props.active &&
    `
    color: ${props.theme.colors.primary};
    background-color: ${props.theme.colors.primary}10;
  `}
`;

const NavControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 0.5rem;
  font-size: 0.875rem;
`;

const UserRole = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${(props) => props.theme.colors.error};
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-left: 0.5rem;
  &:hover {
    background: ${(props) => props.theme.colors.error}cc;
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
`;

const UserDropdown = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  min-width: 180px;
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 0.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  padding: 0.75rem 0.5rem;
  display: ${(props) => (props.open ? "block" : "none")};
`;

const DropdownItem = styled.div`
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.text.primary};
  border-radius: 0.375rem;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.colors.primary}10;
  }
`;

const Navigation = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getInitials = (name, username) => {
    if (name) {
      const parts = name.split(" ");
      return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
    }
    return username ? username[0].toUpperCase() : "U";
  };

  React.useEffect(() => {
    if (!dropdownOpen) return;
    const close = (e) => {
      if (
        !e.target.closest("[data-user-dropdown]") &&
        !e.target.closest("[data-avatar]")
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [dropdownOpen]);

  return (
    <Nav>
      <NavContainer>
        <NavBrand to={isAuthenticated ? "/dashboard" : "/"}>
          {t("dashboard")}
        </NavBrand>
        <NavLinks>
          {isAuthenticated ? (
            <>
              {/* Superadmin: all features */}
              {user?.role === "superadmin" && (
                <>
                  <NavLink
                    to="/admin"
                    active={isActive("/admin") ? "true" : undefined}
                  >
                    Admin Panel
                  </NavLink>
                  <NavLink
                    to="/moderator"
                    active={isActive("/moderator") ? "true" : undefined}
                  >
                    Moderator Panel
                  </NavLink>
                  <NavLink
                    to="/content"
                    active={isActive("/content") ? "true" : undefined}
                  >
                    Content
                  </NavLink>
                  <NavLink
                    to="/users"
                    active={isActive("/users") ? "true" : undefined}
                  >
                    User Management
                  </NavLink>
                  <NavLink
                    to="/reports"
                    active={isActive("/reports") ? "true" : undefined}
                  >
                    Reports
                  </NavLink>
                  <NavLink
                    to="/settings"
                    active={isActive("/settings") ? "true" : undefined}
                  >
                    Settings
                  </NavLink>
                </>
              )}
              {/* Admin: admin, content, settings */}
              {user?.role === "admin" && (
                <>
                  <NavLink
                    to="/admin"
                    active={isActive("/admin") ? "true" : undefined}
                  >
                    Admin Panel
                  </NavLink>
                  <NavLink
                    to="/content"
                    active={isActive("/content") ? "true" : undefined}
                  >
                    Content
                  </NavLink>
                  <NavLink
                    to="/settings"
                    active={isActive("/settings") ? "true" : undefined}
                  >
                    Settings
                  </NavLink>
                </>
              )}
              {/* Moderator: moderator, content */}
              {user?.role === "moderator" && (
                <>
                  <NavLink
                    to="/moderator"
                    active={isActive("/moderator") ? "true" : undefined}
                  >
                    Moderator Panel
                  </NavLink>
                  <NavLink
                    to="/content"
                    active={isActive("/content") ? "true" : undefined}
                  >
                    Content
                  </NavLink>
                </>
              )}
              {/* Editor: content only */}
              {user?.role === "editor" && (
                <NavLink
                  to="/content"
                  active={isActive("/content") ? "true" : undefined}
                >
                  Content
                </NavLink>
              )}
              {/* Viewer: reports only */}
              {user?.role === "viewer" && (
                <NavLink
                  to="/reports"
                  active={isActive("/reports") ? "true" : undefined}
                >
                  Reports
                </NavLink>
              )}
              {/* User: dashboard only (brand link) */}
              {/* Guest: home/public only, no nav links */}
            </>
          ) : (
            <>
              <NavLink to="/" active={isActive("/") ? "true" : undefined}>
                {t("home")}
              </NavLink>
              <NavLink
                to="/login"
                active={isActive("/login") ? "true" : undefined}
              >
                {t("login")}
              </NavLink>
              <NavLink
                to="/public"
                active={isActive("/public") ? "true" : undefined}
              >
                {t("publicInfo")}
              </NavLink>
            </>
          )}
        </NavLinks>
        <NavControls>
          {isAuthenticated && user && (
            <UserDropdown>
              <Avatar
                data-avatar
                title={user?.name || user?.username}
                onClick={() => setDropdownOpen((v) => !v)}
                style={{
                  cursor: "pointer",
                  border: dropdownOpen ? `2px solid ${"#3B82F6"}` : undefined,
                }}
              >
                {getInitials(user?.name, user?.username)}
              </Avatar>
              <DropdownMenu open={dropdownOpen} data-user-dropdown>
                <DropdownItem style={{ fontWeight: 700, cursor: "default" }}>
                  {user?.name || user?.username}
                </DropdownItem>
                {user?.email && (
                  <DropdownItem
                    style={{
                      color: "#6B7280",
                      cursor: "default",
                      fontSize: "0.92rem",
                    }}
                  >
                    {user.email}
                  </DropdownItem>
                )}
                <DropdownItem
                  style={{
                    color: "#3B82F6",
                    fontWeight: 500,
                    cursor: "default",
                  }}
                >
                  {user?.role}
                </DropdownItem>
                <DropdownItem
                  as="button"
                  onClick={handleLogout}
                  style={{ color: "#EF4444", fontWeight: 500, marginTop: 8 }}
                >
                  {t("logout")}
                </DropdownItem>
              </DropdownMenu>
            </UserDropdown>
          )}
          <LanguageSwitcher />
          <ThemeSwitcher />
        </NavControls>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;
