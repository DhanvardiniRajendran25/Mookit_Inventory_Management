
-- Create Customer Table
CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Phone NVARCHAR(15),
    Address NVARCHAR(255),
    PlatformID INT
);

-- Create Product Table
CREATE TABLE Product (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    ProductName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255),
    Price DECIMAL(10, 2) NOT NULL CHECK (Price > 0),
    StockQuantity INT NOT NULL CHECK (StockQuantity >= 0),
    Category NVARCHAR(50)
);

-- Create MooPackage Table
CREATE TABLE MooPackage (
    PackageID INT PRIMARY KEY IDENTITY(1,1),
    PackageName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255),
    Price DECIMAL(10, 2) NOT NULL CHECK (Price > 0)
);

-- Create PackageProducts Table
CREATE TABLE PackageProducts (
    PackageID INT NOT NULL,
    ProductID INT NOT NULL,
    FOREIGN KEY (PackageID) REFERENCES MooPackage(PackageID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    PRIMARY KEY (PackageID, ProductID)
);

-- Create Order Table
CREATE TABLE [Order] (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    CustomerID INT NOT NULL,
    OrderDate DATE NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL CHECK (TotalAmount > 0),
    Status NVARCHAR(50),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);
