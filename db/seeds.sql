INSERT INTO department (id, name) VALUES
(1, 'Sales'),
(2, 'Inventory'),
(3, 'TechnicianArea'),
(4, 'Cleaners');
INSERT INTO role (id, title, salary) VALUES
(1, 'Salemen', 4000),
(2,'InventoryManager', 4500),
(3, 'Technicians', 4870),
(4,'Janitor', 2000);
INSERT INTO employee (id,first_name, last_name, role_id) VALUES
(1,'Alexander', 'Morales',1),
(2,'Javier', 'Lopez',2),
(3,'Henry', 'Alias' ,3),
(4, 'Iris' , 'Gomez' ,4);


SELECT * FROM role
JOIN employee ON employee.role_id = role.id;