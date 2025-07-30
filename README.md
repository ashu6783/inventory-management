**Inventory Management Dashboard**
                                       
                                       ┌──────────────┐
                                       │    Client    │
                                       └──────┬───────┘
                                              │
                          ┌───────────────────▼───────────────────┐
                          │              AWS Cloud                │
                          │                                       │
                          │  ┌─────────────────────────────────┐  │
                          │  │     Virtual Private Cloud       │  │
                          │  │                                 │  │
                          │  │  ┌─────────────┐                │  │
                          │  │  │ Public      │                │  │
                          │  │  │ Subnet      │                │  │
                          │  │  │             │                │  │
                          │  │  │  ┌──────────────┐            │  │
                          │  │  │  │   EC2 (Backend)│◄────┐     │  │
                          │  │  │  └──────┬─────────┘     │     │  │
                          │  │  │         │               │     │  │
                          │  │  └─────────┼───────────────┘     │  │
                          │  │            │                     │  │
                          │  │  ┌─────────▼─────────┐           │  │
                          │  │  │  API Gateway      │           │  │
                          │  │  └─────────┬─────────┘           │  │
                          │  │            │                     │  │
                          │  └────────────┼─────────────────────┘  │
                          │               │                        │
                          │  ┌────────────▼──────────┐             │
                          │  │  Private Subnet       │             │
                          │  │  ┌──────────────────┐ │             │
                          │  │  │ Amazon RDS       │◄┘             │
                          │  │  └──────────────────┘               │
                          │  └─────────────────────────────────────┘
                          │
                          ├──────────────┬───────────────┬─────────────┐
                          │              │               │             │
                 ┌────────▼───────┐  ┌────▼───────┐  ┌────▼─────┐  ┌────▼──────┐
                 │   Amplify      │  │   S3       │  │ Internet │  │ Security  │
                 │  (Next.js App) │  │ (Static)   │  │ Gateway  │  │  Groups   │
                 └───────────────┘  └────────────┘  └──────────┘  └───────────┘

# 🏗️ Deployment Architecture Overview

The following diagram illustrates the cloud infrastructure setup used in this project, leveraging multiple AWS services to ensure scalability, security, and performance.

![Architecture Diagram](./path/to/your/image.png)

## 🧩 Components Breakdown

### 1. **Client**
- The user interacts with the system through a frontend interface, which is served via AWS Amplify (Next.js framework).

### 2. **Frontend**
- **AWS Amplify (Next.js)**: Hosts the client-side application. It fetches data from backend APIs via API Gateway.
- **Amazon S3 (Simple Storage Service)**: Used to store and retrieve static assets, media files, or other resources needed by the application.

### 3. **API Layer**
- **Amazon API Gateway**: Acts as an interface between the frontend (Amplify) and backend services hosted on EC2. It manages and secures API endpoints.

### 4. **Backend**
- **Amazon EC2**: Hosts the backend server or application logic (e.g., Node.js/Express). Located within a **public subnet**, secured via a Security Group.
- **Security Group**: Controls inbound/outbound traffic for EC2 based on specific ports (e.g., HTTP, HTTPS).

### 5. **Database**
- **Amazon RDS (Relational Database Service)**: Securely stores structured application data.
- Placed inside a **private subnet** to restrict direct access from the internet.
- Connected to the EC2 instance through private routing and controlled via a dedicated Security Group.

### 6. **Networking**
- **VPC (Virtual Private Cloud)**: A logically isolated network environment.
- **Public Subnet**: Hosts resources that need internet access (like EC2).
- **Private Subnet**: Hosts resources that should not be exposed publicly (like RDS).
- **Internet Gateway**: Enables outbound communication from the VPC to the internet.
- **Route Tables**:
  - **Public Route Table**: Allows EC2 to communicate with the internet.
  - **Private Route Table**: Enables private subnet communication internally within VPC.

---

## ✅ Key Benefits

- **Scalability**: Frontend (Amplify) and backend (EC2) can be scaled independently.
- **Security**: Database is isolated in a private subnet; API access is managed through Gateway and Security Groups.
- **Modularity**: Each component is decoupled, enabling independent development and deployment.

