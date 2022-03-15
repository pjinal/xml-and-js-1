const table = document.getElementById(`generated-content`);
const fileName = `./assignments/people.xml`;

const loadData = path => new Promise(resolve => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ({ target }) => {
      if (target.readyState == 4 && target.status == 200) {
        resolve(target.response);
      }
    };
    xhttp.open("GET", path, true);
    xhttp.send();
});

const isFiltered = (name, term) => !name.toLowerCase().includes(term.toLowerCase());

const renderTable = (data, term) => {
    const htmlString = JSON.parse(data).reduce((prev, current) => {
        const fullName = `${current.first_name} ${current.last_name}`;
        if (term && isFiltered(fullName, term)) return prev;

        return prev + `<tr>
            <td>${current.id}</td>
            <td>${fullName}</td>
            <td>${current.email}</td>
            <td>${current.gender}</td>
            <td>${current.ip_address}</td>
        </tr>`;
    }, "");
    table.innerHTML = htmlString;
}

const onSubmit = (event) => {
    event.preventDefault();

    const term = event.target.name.value;
  
    loadData(`./data.json`).then((data) => renderTable(data, term));
};

const onReset = () => {
    loadData(`./data.json`).then((data) => renderTable(data));
};

onReset();