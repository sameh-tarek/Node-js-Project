# project ERD
 
 
##  Storage
we 'll use a nosql database 

### Schema: ###
we 'll need at least the following collections to implement the service:

**1-Users table:**

| column | type |
|--------|------|
| user_id (pk)| int |
| first name | string |
| last name | string |
| password | string |
| user_type | string |

**2-doctors:**
| column | type |
|--------|------|
| doctor_id (pk)| int |
| doctor_name | string |
| doctor_password | string |
| courses_id | [string] |
---

**3-students:**
| column | type |
|--------|------|
| student_id (pk)| int |
| student_name | string |
| student_password | string |
| courses_ids | [string] |
---

**4-Departments table:**

| column | type |
|--------|------|
| department_id (pk)| int |
| department_name | string |
| department_code | string |
---

**5-Courses table:**

| column | type |
|--------|------|
| course_id (pk)| int  |
| course_name | string |
| course_code | string |
| department_id (FK->2) | int |
| req_courses | [string] |   
---


**4-Materials table:**

| column | type |
|--------|------|
| material_id (pk)| int |
| material_name | string |
| material_code | string |
| course_id (FK->3)| int |


**6-Attendance table:**

| column | type |
|--------|------|
| course_id (pk)| int |
| student_name | [string] |
---

//not complete
**7-Files table:**

| column | type |
|--------|------|
| file_id (pk)| [int] |
| file_name | [string] |
| course_id | string |

**8-success cources:**

| column | type |
|--------|------|
| studint_id | int |
| course_id| [string] |
---
