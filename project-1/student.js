//Dynamically Creating rows of the table along with the data bound
const htmlToElement = (html) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

//read the xml data
const loadData = (path, callback) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = ({ target }) => {
    if (target.readyState == 4 && target.status == 200) {
      callback(target.responseXML);
    }
  };
  xhttp.open("GET", path, true);
  xhttp.send();
};

//Construct each row of the table
const generateTableRow = (item) => {
  const id = item.getAttribute(`id`);
  const gender = item.getAttribute(`gender`);
  const studentname = Array.from(item.getElementsByTagName(`studentname`))[0];
  const major = Array.from(item.getElementsByTagName(`major`))[0];
  const enrollmentdate = Array.from(
    item.getElementsByTagName(`enrollmentdate`)
  )[0];

  return `<tr>
        <td>${id}</td>
        <td>${gender}</td>
        <td>${studentname.textContent}</td>
        <td>${major.textContent}</td>
        <td>${enrollmentdate.textContent}</td>
    </tr>`;
};

//Method to render table after each search
const renderTable = (xmlData) => {
  const table = document.getElementById("student-table");

  if (!table) {
    throw new Error("No table element found");
  }

  const nodes = Array.from(xmlData.documentElement.childNodes).filter(
    ({ nodeName }) => nodeName === `student`
  );
  let filteredNodes;
  const withFilters = Boolean(window.location.search);

  // If url paramters found in the url, display only the xml node datas based on filter
  if (withFilters) {
    //As the form reloads the input & check boxes values are lost so set them back
    const params = new URLSearchParams(window.location.search);

    //The input search term
    const search_term = params.get(`search`).toLowerCase();

    const inputControl = document.getElementById(`input-name-term`);
    inputControl.value = search_term;

    //The GENDER checboxes
    let aGender = [];

    if (params.get(`gender1`)) {
      aGender.push(params.get(`gender1`).toLowerCase());
      document.getElementById(`gender1`).checked = true;
    }
    if (params.get(`gender2`)) {
      aGender.push(params.get(`gender2`).toLowerCase());
      document.getElementById(`gender2`).checked = true;
    }

    if (aGender.length == 0) {
      //If no gender selected, then do not put a filter on gender with &&
      filteredNodes = nodes.filter(
        (obj) =>
          obj
            .getElementsByTagName("studentname")[0]
            .textContent.toLowerCase()
            .includes(search_term) ||
          obj
            .getElementsByTagName("major")[0]
            .textContent.toLowerCase()
            .includes(search_term) ||
          obj
            .getElementsByTagName("enrollmentdate")[0]
            .textContent.toLowerCase()
            .includes(search_term) ||
          obj.getAttribute("id").toLowerCase().includes(search_term)
      );
    } else {
      //If any gender selected, then put a filter on gender with &&
      filteredNodes = nodes.filter(
        (obj) =>
          (obj
            .getElementsByTagName("studentname")[0]
            .textContent.toLowerCase()
            .includes(search_term) ||
            obj
              .getElementsByTagName("major")[0]
              .textContent.toLowerCase()
              .includes(search_term) ||
            obj
              .getElementsByTagName("enrollmentdate")[0]
              .textContent.toLowerCase()
              .includes(search_term) ||
            obj.getAttribute("id").toLowerCase().includes(search_term)) &&
          aGender.find(
            (element) => element == obj.getAttribute("gender").toLowerCase()
          )
      );
    }
  } else {// If not url paramters found in the url, display all the xml node data
    filteredNodes = nodes;
  }

  //generate each row of the table, based on the xml node and append to the table
  filteredNodes.map((studentNode) =>
    table.appendChild(htmlToElement(generateTableRow(studentNode)))
  );
};

//dynamic loading of table data
loadData(`./student.xml`, renderTable);

//on reset replace the url by removing all the url paramters
const onReset = () => {
  window.location.replace(window.location.pathname);
};

//method to trigger the submit() function of the form on checkbox selection
function checkBoxSelect() {
  document.getElementById("studentSearch").submit();
}
