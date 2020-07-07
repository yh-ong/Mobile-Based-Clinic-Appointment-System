# Mobile-Based Clinic Appointment System

**Notes** : *for admin, doctor and clinic, no mobile based support only available at web based. Please checkout [here - Web-Based Clinic Appointment System](https://github.com/yh-ong/Web-Based-Clinic-Appointment-System)*

[TOC]

ClinicME will involve two platforms which are mobile application and web based. For the mobile application based will use Ionic framework developed to let patient to book an appointment by anywhere in anytime. In web based, the system will use HTML, CSS, Javascript, PHP and MySQL developed to let clinic administrator and doctor to manage the appointment and update the clinic and doctor information.

## Purpose
Aim at developing the clinic appointment apps to provide patients with a convenient way to make clinic appointment. This can minimise the hassle of patients having long queue in seeking consultation with the doctor and less interruption for clinic administrative officer during the peak hour. Besides that, a patient no longer needs to walk in and make a call to book an appointment. Thus, it brings convenience to patients.

## Features
In this project, contains 4 user-roles. Each users key features and functionalities listed as below:

#### Admin
- approve the clinic status for new registration
- view clinic/doctor/patient list
- add/edit/delete speciality

#### Doctor
- edit doctor information & password reset
- add sympton/diagnosis/advice in the database
- view & add follow up the appointments
- manage the available schedule
- add/edit/delete treatment type

#### Clinic
- add/edit/delete doctor
- add/edit clinic information
- add/edit clinic manager & password reset
- view appointment status & list
- make annoucement for patient

#### Patient
- register as an patient account
- edit profile & password reset
- book & cancel an appointment
- view booking status
- view doctor availability
- search clinic & doctor with filter
- rate and review

**Notes** : *for admin, doctor and clinic, no mobile based support only available at web based. Please checkout [here - Web-Based Clinic Appointment System](https://github.com/yh-ong/Web-Based-Clinic-Appointment-System)*

## Technology
Clinic ME uses a number of technology to work properly:

#### Front-End
- HTML
- CSS
- Ionic 4
- Angular 8

#### Back-End
- PHP 7.1.7
- MySQL

#### Plugin
- Ionic
- Cordova

Install plugin with
> $ npm install -g ionic cordova

**Note:** The -g means this is a global install. [More info](https://ionicframework.com/docs/v3/intro/installation/)

#### Software Requirement
- [XAMPP](https://www.apachefriends.org/index.html) or any web server with Apache & MySQL service
- [Ngrok](https://ngrok.com/download) - for localhost development access on web (optional)
- Google Chrome (Recommended) & Mozila Firefox
- [Node.js](https://nodejs.org/en/download/)

## Usage
1. create a folder name as `doclab`, clone all the file inside the folder.
2. install **xampp** or **any web server tool** to your computer, and start `Apache` and `MySQL` services.
3. type `http://localhost/doclab/` to the web browser
4. `service/provider.service.ts` setup all the server connection here:

```javascript
const SERVER_NAME = "http://localhost";
...
```

#### Build
1. `$ npm install` to install the package dependencies
2. `$ ionic serve` on terminal/cmd to run the app on web browser or `$ ionic cordova build android` to build the project

For [More Info](https://ionicframework.com/docs/v1/guide/testing.html)