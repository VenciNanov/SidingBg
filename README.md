# SidingBg
Simple Content management system for SoftUni react.js course

# Description:
Application is a simple handmade CMS(Content management system) designed mainly for business/presentation websites.
Which operates with only one user acting as the administrator of the application who can add content in the application.

# Technology stack
  ASP.NET Core MVC
  MSSQL
  React.js
  SASS
  
# Functionalities
  # CMS
    Login 
    Logout
    All pages
    Create page
      -types
        *Basic
        *Tabs
        *Gallery
    Edit page
    Add tab
    Add Image to Basic/Tab/Gallery
    Delete Image from Tab/Gallery
  # Main
    Dynamic navbar
    Dynamic pages
    

# How to work with it:
  Run SidingBg.sln with visual studio or other similar program.
  Database will be on your local machine by default.
  Run npm install in ../SidingBg.App/App .
  Run npm start in the same directory.
  
  On the first run of the API an initial and the only user will be seeded into the database. This uesr will operate as the administrator
  of the application who can add/remove content and pages. An initial Home page will be seeded into the database also, this will be the Index
  page of the application.
