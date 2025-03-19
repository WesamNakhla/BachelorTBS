import { Link } from "react-router-dom";
import { SidebarContainer, Logo, Nav, NavItem } from "../styles/SidebarStyles";
import NotificationBell from "./NotificationBell";

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Logo>TBS</Logo>
      <Nav>
        <NavItem id="dashboard">
          <Link to="/dashboard">Dashboard</Link>
        </NavItem>
        <NavItem id="invoices">
          <Link to="/invoices">Fakturaer</Link>
        </NavItem>
        <NavItem id="customers">
          <Link to="/customers">Kunder</Link>
        </NavItem>
        <NavItem id="users">
          <Link to="/users">Users</Link>
        </NavItem>
        <NavItem id="roles">
          <Link to="/users/roles">Roles</Link>
        </NavItem>
        <NavItem id="security-settings">
          <Link to="/security">Security Settings</Link>
        </NavItem>
        <NavItem id="activity-logs">
          <Link to="/security/logs">Activity Logs</Link>
        </NavItem>
        <NavItem id="reports">
          <Link to="/reports">Reports</Link>
        </NavItem>
        <NavItem id="notifications">
          <Link to="/notifications">Notifications</Link>
        </NavItem>
        <NavItem id="settings">
          <Link to="/settings">Settings</Link>
        </NavItem>
      </Nav>
      <NotificationBell />
    </SidebarContainer>
  );
};

export default Sidebar;
