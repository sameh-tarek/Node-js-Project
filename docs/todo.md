# admin

**add depart:**

in depart table add id,name,code 

---
**add course:**

in course table: add course id,name ,code,depID ,only one req course

---
**generate attendance:**

from attendance teble: read students names by course id

---
**create doctor account:**

in doctor table:: add doctor_id , doctor_name, doctor_password, courses 

---
**create student accoutn:**

in students name:: add id, name, pass, courses"not required"

---
---

# doctor

**viwe doctor courses:**

all courses will appear from doctor table by his id
when open a course by it's link 
we will get courses ids
and generate the courses names from courses table

---
**doctor upload file:**

doctor open the course by it's link
put file name and id so when student open this course the files will appeat to him by the course code.

--- 

# student

**enroll course:** 


**view course:** 

we will take his courses ids from student table by the studen id
and by the courses ids we will write the courses names from courses table and by courses names "links" he will view the course files from files table by the course id