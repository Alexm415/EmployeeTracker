

INSERT INTO department (name) VALUES
( 'Sales'),
( 'Inventory'),
( 'TechnicianArea'),
( 'Cleaners');
INSERT INTO role (title, salary, department_id) VALUES
( 'Salemen', 4000,1),
( 'InventoryManager', 4500,2),
( 'Technicians', 4870,3),
('Janitor', 2000,4);
INSERT INTO employee (first_name, last_name, role_id) VALUES
('Alexander', 'Morales', 1),
('Javier', 'Lopez', 2),
('Henry', 'Alias', 3),
('Iris', 'Gomez', 4);


SELECT * FROM role
JOIN employee ON employee.role_id = role.id;
