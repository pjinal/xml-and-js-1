
1. Worked on the student.js file - 
- dynamic loading of data
- search button triggers the submit() function of the form, it reads the url parameters which will 
        contain the input field value and the checkbox selected
- on selecting the checkbox the submit() function of the form is triggered and the 
        table is dynamically loaded again
- if none of the gender is selected the table displays all the data based on the serach term
        else it also filters on the gender checked
- whenever the submit() function is triggered, the form reloads and the previous selection may be lost
        as we are not using prevent default. Therefore, the url parameters are read and set back to the
        input field and checkboxes

2. Added css through the style.css file

3. Ouptut without filter

![image info](output-without-filter.jpeg)

4. Output with filter

![image info](output-with-filter.jpeg)
