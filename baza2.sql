create database baza;
create table Pupil (`pupil_id` int primary key , `name` varchar(45), `surname` varchar(45), `pesel` varchar(45), `class` varchar(45));
create table Teacher (`teacher_id` int primary key, `name` varchar(45), `surname` varchar(45), `pesel` int, `subject` varchar(45));
create table Subject (`subject_id` int primary key, `name` varchar(45));
create table Grade (`pupil_id` int REFERENCES Pupil(pupil_id),`value` int, `weight` int) 
create table Pupil_Subject(`pupil_id` int REFERENCES Pupil(pupil_id),`subject_id` int REFERENCES Subject(subject_id))
create table Pupil_Teacher(`pupil_id` int REFERENCES Pupil(pupil_id),`teacher_id` int REFERENCES Teacher(teacher_id))
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
flush privileges;

