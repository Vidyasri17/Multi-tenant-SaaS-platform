# API Documentation

## Authentication
### Register Tenant
- **Endpoint**: `POST /api/tenants/register`
- **Access**: Public
- **Body**:
  ```json
  {
    "companyName": "Acme Corp",
    "subdomain": "acme",
    "adminEmail": "admin@acme.com",
    "adminFullName": "John Doe",
    "adminPassword": "password123",
    "plan": "free"
  }
  ```
- **Response**: `201 Created`

### Login
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Body**:
  ```json
  {
    "email": "admin@acme.com",
    "password": "password123",
    "tenantSubdomain": "acme"
  }
  ```
- **Response**: `200 OK` (returns token)

### Get Current User
- **Endpoint**: `GET /api/auth/me`
- **Access**: Authenticated
- **Response**: `200 OK`

## Tenants
- `GET /api/tenants/:tenantId` - Get tenant details
- `PUT /api/tenants/:tenantId` - Update tenant
- `GET /api/tenants` - List all tenants (Super Admin only)

## Users
- `POST /api/tenants/:tenantId/users` - Add user to tenant
- `GET /api/tenants/:tenantId/users` - List users
- `PUT /api/users/:userId` - Update user
- `DELETE /api/users/:userId` - Delete user

## Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - List projects
- `PUT /api/projects/:projectId` - Update project
- `DELETE /api/projects/:projectId` - Delete project

## Tasks
- `POST /api/projects/:projectId/tasks` - Create task
- `GET /api/projects/:projectId/tasks` - List tasks
- `PUT /api/tasks/:taskId` - Update task
- `PATCH /api/tasks/:taskId/status` - Update task status
- `DELETE /api/tasks/:taskId` - Delete task
