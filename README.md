# Billing System

## Overview

This is a simple billing and invoice management system developed using ASP.NET Core MVC. The project allows users to manage products, create invoices, calculate totals automatically, and keep track of billing records. It was developed to improve my understanding of building CRUD applications, database operations, and implementing a clean MVC architecture.

## Features

• Create invoices with multiple products

• Automatically calculate subtotal, VAT, discount, and final amount

• Manage product information

• View invoice history

• Search invoices and products

• Edit and delete products

• Generate invoice totals automatically

• Store billing data in SQL Server

## Technologies Used

- ASP.NET Core MVC
- C#
- Dapper
- SQL Server
- HTML
- CSS
- Bootstrap
- JavaScript
- jQuery

## Project Structure

```
BillingSystem
│
├── BillingSystem.UI
├── BillingSystem.Data
├── Controllers
├── Models
├── Views
├── wwwroot
├── appsettings.json
└── BillingSystem.sln
```

## How to Run the Project

### Requirements

- Visual Studio 2022
- .NET SDK
- SQL Server
- SQL Server Management Studio (SSMS)

### Steps

1. Clone this repository.

```
git clone https://github.com/yourusername/BillingSystem.git
```

2. Open the solution in Visual Studio.

3. Create the database in SQL Server.

4. Update the connection string inside `appsettings.json`.

5. Restore the NuGet packages.

6. Build and run the project.

## Screenshots

### Invoice Creation

<img width="1920" height="1200" alt="Screenshot (927)" src="https://github.com/user-attachments/assets/7f77ee84-21ec-44ea-a0e2-2e3efa0ae580" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/d2a4632a-eeee-4144-9fe1-8444045e114c" />



### Invoice List

<img width="1920" height="1200" alt="Screenshot (928)" src="https://github.com/user-attachments/assets/15cde68f-424b-4d75-8aa7-b48c15702266" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/3e69d747-f347-454b-bfd9-94cc2ae8f7fb" />



### Product Management

<img width="1920" height="1200" alt="Screenshot (929)" src="https://github.com/user-attachments/assets/129d2f30-4bf0-49c7-ad97-41ba1aaa79a6" />


## What I Learned

While building this project, I improved my understanding of:

- ASP.NET Core MVC architecture
- CRUD operations
- Dapper for database access
- SQL Server
- Repository pattern
- Model validation
- MVC routing
- Building responsive user interfaces
- Working with invoice calculations and business logic

## Future Improvements

Some features I would like to add in the future are:

- User authentication and authorization
- PDF invoice generation
- Customer management
- Dashboard with sales reports
- Export invoices to Excel or PDF
- Inventory management
- Role-based access

## Author

**Bidushi Gautam**
