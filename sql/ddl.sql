/*
CREATED		21/10/2019
MODIFIED		28/11/2019
PROJECT		
MODEL		
COMPANY		
AUTHOR		
VERSION		
DATABASE		FIREBIRD 
*/


CREATE DOMAIN T_ID AS VARCHAR(20);
CREATE DOMAIN T_NOMBRE_USUARIO AS VARCHAR(50);
CREATE DOMAIN T_APELLIDOS AS VARCHAR(70);
CREATE DOMAIN T_MAIL AS VARCHAR(50);
CREATE DOMAIN T_CLAVE AS VARCHAR(200);
CREATE DOMAIN T_NOMBRE_EMPRESA AS VARCHAR(50);
CREATE DOMAIN T_IP AS VARCHAR(50);
CREATE DOMAIN T_LOGICO AS VARCHAR(1);
CREATE DOMAIN T_NOMBRE_ARTICULO AS VARCHAR(150);
CREATE DOMAIN T_DINERO AS DECIMAL(8,2);
CREATE DOMAIN T_NIF AS VARCHAR(15);
CREATE DOMAIN T_DIR AS CHAR(200);
CREATE DOMAIN T_ROL AS VARCHAR(50);


CREATE TABLE USUARIO  (
	ID_USUARIO T_ID NOT NULL,
	NOMBRE T_NOMBRE_USUARIO NOT NULL,
	APELLIDOS T_APELLIDOS NOT NULL,
	MAIL T_MAIL NOT NULL UNIQUE,
	CLAVE T_CLAVE NOT NULL,
	ACTIVO T_LOGICO NOT NULL,
 PRIMARY KEY (ID_USUARIO)
);

CREATE TABLE SUPER_ADMIN  (
	ID_SUPER_ADMIN T_ID NOT NULL,
	ID_USUARIO T_ID NOT NULL,
 PRIMARY KEY (ID_SUPER_ADMIN)
);

CREATE TABLE EMPRESA  (
	ID_EMPRESA T_ID NOT NULL,
	NOMBRE T_NOMBRE_EMPRESA NOT NULL,
	ACTIVO T_LOGICO NOT NULL,
 PRIMARY KEY (ID_EMPRESA)
);

CREATE TABLE SESION  (
	ID_SESION T_ID NOT NULL,
	ID_USUARIO T_ID NOT NULL,
	FECHA_INICIO TIMESTAMP,
	FECHA_ACCESO TIMESTAMP,
	FECHA_FIN TIMESTAMP,
	IP T_IP,
 PRIMARY KEY (ID_SESION)
);

CREATE TABLE USUARIO_EMPRESA  (
	ID_USUARIO_EMPRESA T_ID NOT NULL,
	ID_EMPRESA T_ID NOT NULL,
	ID_USUARIO T_ID NOT NULL,
	NOMBRE T_NOMBRE_USUARIO NOT NULL,
	APELLIDOS T_APELLIDOS NOT NULL,
	NIF T_NIF NOT NULL,
	ACTIVO T_LOGICO NOT NULL,
	DIR T_DIR NOT NULL,
 PRIMARY KEY (ID_USUARIO_EMPRESA)
);

CREATE TABLE ADMINISTRADOR  (
	ID_ADMINISTRADOR T_ID NOT NULL,
	ID_USUARIO_EMPRESA T_ID NOT NULL,
	ACTIVO T_LOGICO NOT NULL,
 PRIMARY KEY (ID_ADMINISTRADOR)
);

CREATE TABLE TRABAJADOR  (
	ID_TRABAJADOR T_ID NOT NULL,
	ID_USUARIO_EMPRESA T_ID NOT NULL,
	ACTIVO T_LOGICO NOT NULL,
 PRIMARY KEY (ID_TRABAJADOR)
);

CREATE TABLE CLIENTE  (
	ID_CLIENTE T_ID NOT NULL,
	ID_USUARIO_EMPRESA T_ID NOT NULL,
	ACTIVO T_LOGICO NOT NULL,
 PRIMARY KEY (ID_CLIENTE)
);

CREATE TABLE ARTICULO  (
	ID_ARTICULO T_ID NOT NULL,
	ID_EMPRESA T_ID NOT NULL,
	NOMBRE T_NOMBRE_ARTICULO,
	PRECIO T_DINERO,
	IVA T_DINERO,
	ACTIVO T_LOGICO,
 PRIMARY KEY (ID_ARTICULO)
);

CREATE TABLE PEDIDO  (
	ID_PEDIDO T_ID NOT NULL,
	ID_EMPRESA T_ID NOT NULL,
	ID_CLIENTE T_ID,
	FECHA TIMESTAMP NOT NULL,
	DIR T_DIR NOT NULL,
 PRIMARY KEY (ID_PEDIDO)
);

CREATE TABLE LINEA_PEDIDO  (
	ID_LINEA_PEDIDO T_ID NOT NULL,
	ID_PEDIDO T_ID NOT NULL,
	ID_ARTICULO T_ID NOT NULL,
	CANTIDAD T_DINERO,
	PRECIO T_DINERO,
	IVA T_DINERO,
	NOMBRE T_NOMBRE_ARTICULO,
	NUMERO INTEGER,
 PRIMARY KEY (ID_LINEA_PEDIDO)
);


CREATE INDEX INDICE_USUARIO_APELLIDOS  ON USUARIO (APELLIDOS);
CREATE INDEX INDICE_EMPRESA_NOMBRE  ON EMPRESA (NOMBRE);


ALTER TABLE SUPER_ADMIN ADD FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO (ID_USUARIO) ON UPDATE NO ACTION ON DELETE NO ACTION ;
ALTER TABLE SESION ADD FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO (ID_USUARIO) ON UPDATE NO ACTION ON DELETE NO ACTION ;
ALTER TABLE USUARIO_EMPRESA ADD FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO (ID_USUARIO) ON UPDATE NO ACTION ON DELETE NO ACTION ;
ALTER TABLE USUARIO_EMPRESA ADD FOREIGN KEY (ID_EMPRESA) REFERENCES EMPRESA (ID_EMPRESA) ON UPDATE NO ACTION ON DELETE NO ACTION ;
ALTER TABLE ARTICULO ADD FOREIGN KEY (ID_EMPRESA) REFERENCES EMPRESA (ID_EMPRESA) ON UPDATE NO ACTION ON DELETE NO ACTION ;
ALTER TABLE PEDIDO ADD FOREIGN KEY (ID_EMPRESA) REFERENCES EMPRESA (ID_EMPRESA) ON UPDATE NO ACTION ON DELETE NO ACTION ;
ALTER TABLE ADMINISTRADOR ADD FOREIGN KEY (ID_USUARIO_EMPRESA) REFERENCES USUARIO_EMPRESA (ID_USUARIO_EMPRESA) ON UPDATE NO ACTION ON DELETE NO ACTION ;
ALTER TABLE TRABAJADOR ADD FOREIGN KEY (ID_USUARIO_EMPRESA) REFERENCES USUARIO_EMPRESA (ID_USUARIO_EMPRESA) ON UPDATE NO ACTION ON DELETE NO ACTION ;
ALTER TABLE CLIENTE ADD FOREIGN KEY (ID_USUARIO_EMPRESA) REFERENCES USUARIO_EMPRESA (ID_USUARIO_EMPRESA) ON UPDATE NO ACTION ON DELETE NO ACTION ;
ALTER TABLE PEDIDO ADD FOREIGN KEY (ID_CLIENTE) REFERENCES CLIENTE (ID_CLIENTE) ON UPDATE NO ACTION ON DELETE NO ACTION ;
ALTER TABLE LINEA_PEDIDO ADD FOREIGN KEY (ID_ARTICULO) REFERENCES ARTICULO (ID_ARTICULO) ON UPDATE NO ACTION ON DELETE NO ACTION ;
ALTER TABLE LINEA_PEDIDO ADD FOREIGN KEY (ID_PEDIDO) REFERENCES PEDIDO (ID_PEDIDO) ON UPDATE NO ACTION ON DELETE NO ACTION ;


SET TERM ^;


SET TERM ;^


