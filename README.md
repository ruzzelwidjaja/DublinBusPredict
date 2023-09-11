# Dublin Bus Journey Planner

![Dublin Bus Journey Planner](screenshots/your_screenshot.png)

## Table of Contents

- [Introduction](#introduction)
- [Description of Final Product](#description-of-final-product)
- [Architecture and Technical Stack](#architecture-and-technical-stack)
- [Machine Learning](#machine-learning)

## Introduction

The **Dublin Bus Journey Planner** is an innovative application developed as part of the Climate Action and Low Carbon Development (Amendment) Act 2021. It aims to contribute to the goal of achieving a net-zero emissions scenario by 2050 by improving the reliability and user experience of Dublin's public transport system.

### Project Goals

- Increase the use of public transport.
- Reduce the number of car journeys taken.
- Convert the transport fleet to zero-emissions vehicles.
- Provide passengers with a smooth and reliable journey experience.
- Incorporate accurate mapping and routing technologies for full journey planning.

The application is designed to predict journey times accurately for Dublin Bus trips, provide clear directions, offer route and stop information, allow users to save favorite stops, provide live weather updates, and show nearby stops.

## Description of Final Product

### Journey Planner

The journey planner is the heart of the application. Users can enter their starting location and desired destination, and the app will provide them with a route, instructions, and estimated trip duration. It utilizes the Google Places API for location input and the Google Maps API for route presentation.

### Routes

This feature allows users to look up specific bus routes and view the shape of the route the bus will follow. It also displays information about each stop along the route.

### Geo Location

The application offers geolocation, providing users with information about nearby bus stops within a 500-meter radius. Users can enable this feature after granting location permission.

### User Authentication / User Accounts

Users can create accounts, enabling a personalized experience. Secure user data storage is handled by Django.

### Weather

Live weather information for Dublin is displayed on the home page, including current conditions and weather icons. This feature is powered by the OpenWeather API and updates every 5 minutes.

### Bus Stops

Users can toggle the display of all Dublin bus stops on the map. Stops are clustered for a smoother experience, with individual markers appearing upon zooming in.

### Favorites

Logged-in users can save their favorite routes and stops, enhancing their user experience.

### Mobile Friendly

The application follows a "mobile-first" approach, making it accessible and user-friendly on both mobile devices and larger screens.

### Twitter Feed

Integrating the Dublin Bus news feed from Twitter provides real-time updates on bus schedules, route changes, or delays, keeping users informed.

### Machine Learning Innovations

Predictive models are used to estimate journey times, with a focus on whole trip predictions, departure time, day of the week, month, and temperature as key factors.

### Administrative Interface

A Django backend provides an administrative interface for managing data, making it easy for non-technical users to update bus routes and stops.

## Architecture and Technical Stack

The application's architecture consists of a frontend application (React) and a backend (Django) deployed on separate servers. Here's an overview of the technical stack:

### Backend

- **Framework**: Django
- **Database**: MySQL via Amazon RDS
- **Web Server**: Nginx
- **Application Server**: uWSGI

### Frontend

- **Library**: React
- **Styling**: Tailwind CSS

### External Data Sources

- **Mapping**: Google Maps API
- **Weather**: OpenWeather API

## Machine Learning

Machine learning models were trained to predict journey times based on historical data. Key features considered for predictions included departure time, day of the week, month, and temperature. The random forest model was chosen for its accuracy, with a Mean Average Percentage Error (MAPE) of 12.1%.
