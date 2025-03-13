let row = document.createElement('tr');
let name_td = document.createElement('td');
let type_td = document.createElement('td');
let code_td = document.createElement('td');
let id_td = document.createElement('td');
let manufacturer_td = document.createElement('td');

export function createRow(name, type, code, id, manufacturer) {
    name_td.textContent = name;
    type_td.textContent = type;
    code_td.textContent = code;
    id_td.textContent = id;
    manufacturer_td.textContent = manufacturer;
    row.appendChild(name_td);
    row.appendChild(type_td);
    row.appendChild(code_td);
    row.appendChild(id_td);
    row.appendChild(manufacturer_td);
    return row;
}

export function getRow() {
    return row;
}

