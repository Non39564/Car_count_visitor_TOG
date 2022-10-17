import pymysql
from datetime import datetime
import pyqrcode
import shutil


def getConnection():
    return pymysql.connect(
        host='localhost',
        db='car_regis',
        user='root',
        password='',
        charset='utf8',
        cursorclass=pymysql.cursors.DictCursor
    )


def get_data_user():
    connection = getConnection()
    sql = """
    SELECT user.Employee_ID, user.Name, user.Phone, agency.Detail as Agency, company.Detail as company, 
    company_dormitory.Detail as company_dormitory, data_user.Car_Regitation as car_regis, type_vehicle.Detail as type_vehicle,
    zone.Detail as Zone, receive_sticker.WhenDate as receive_sticker_Date, receive_sticker.Recipient as recipName, receive_sticker.ID as id
    from user
    JOIN agency ON agency.ID = user.Agency
    JOIN company ON company.ID = user.Company
    JOIN company_dormitory ON company_dormitory.ID = user.Company_dormitory
    JOIN data_user ON data_user.Employee_ID = user.Employee_ID
    JOIN type_vehicle ON type_vehicle.ID = data_user.Type_Vehicle
    JOIN zone ON zone.ID = data_user.Zone
    JOIN receive_sticker ON receive_sticker.Employee_ID = user.Employee_ID
    ORDER BY id ASC
    """
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    return data


def insert_data(uid, date):
    connection = getConnection()
    sql = "INSERT INTO vechine_today(Date, Employee_ID) VALUES ('%s','%s')" % (
        date, uid)
    cursor = connection.cursor()
    try:
        cursor.execute(sql)
        connection.commit()
    except:
        print('insert fail')


def User_data(user):
    connection = getConnection()
    sql = f"""
    SELECT user.Employee_ID, user.Name, user.Phone, agency.Detail as Agency, company.Detail as company, 
    company_dormitory.Detail as company_dormitory, data_user.Car_Regitation as car_regis, type_vehicle.Detail as type_vehicle,
    zone.Detail as Zone, receive_sticker.WhenDate as receive_sticker_Date, receive_sticker.Recipient as recipName, receive_sticker.ID as id
    from user
    JOIN agency ON agency.ID = user.Agency
    JOIN company ON company.ID = user.Company
    JOIN company_dormitory ON company_dormitory.ID = user.Company_dormitory
    JOIN data_user ON data_user.Employee_ID = user.Employee_ID
    JOIN type_vehicle ON type_vehicle.ID = data_user.Type_Vehicle
    JOIN zone ON zone.ID = data_user.Zone
    JOIN receive_sticker ON receive_sticker.Employee_ID = user.Employee_ID
    WHERE user.Employee_ID = {user} ORDER BY id ASC
    """
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()

    now = datetime.now()
    insert_time = now.strftime("%Y-%m-%d")
    if len(data) > 0:
        insert_data(user, insert_time)
    return data

def visitor_user():
    connection = getConnection()
    sql = f"""
        SELECT * FROM visitor_detail
        ORDER BY ID DESC"""
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    return data

def insert_visitor(id, date):
    connection = getConnection()
    sql = f"INSERT INTO visitor(Visitor, Date) VALUES ('{id}','{date}')"
    cursor = connection.cursor()
    try:
        cursor.execute(sql)
        connection.commit()
    except:
        print('insert fail')

def Visitor_data(detail):
    connection = getConnection()
    sql = f"""
        SELECT * FROM visitor_detail WHERE why = '{detail}' 
        ORDER BY ID DESC
        Limit 1
        """
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    id = data[0]["ID"]
    now = datetime.now()
    insert_time = now.strftime("%Y-%m-%d")
    if len(data) > 0:
        insert_visitor(id, insert_time)
    return data

def columnDashboard():
    connection = getConnection()
    sql = """SELECT Date FROM vechine_today GROUP BY Date"""
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    column = [item["Date"].strftime("%Y-%m-%d") for item in data]
    return column


def dataactualrowDahboard():
    connection = getConnection()
    sql = """SELECT COUNT(*) as Data FROM vechine_today GROUP BY Date"""
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    row = [item["Data"] for item in data]
    return row


def dataallrowDahboard():
    connection = getConnection()
    sql = """SELECT COUNT(*) as Data FROM receive_sticker"""
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    row = [item["Data"] for item in data]
    return row


def gen_qrcode(data):
    print(data)
    for d in range(len(data)):
        url = "https://a41e-184-82-103-244.ap.ngrok.io"
        Employee_ID = data['รหัสพนักงาน'][d]
        connection = getConnection()
        sql = "INSERT INTO receive_qrcode(Employee_ID) VALUES ('%s')" % (
            Employee_ID)
        cursor = connection.cursor()
        try:
            cursor.execute(sql)
            connection.commit()
        except:
            print('insert fail')
        qr = pyqrcode.create(url+"/User/"+str(Employee_ID))
        filename = "./qrcode/"+str(Employee_ID)+".png"
        print(filename)
        qr.png(filename, scale=6)
    shutil.make_archive('qrcode', 'zip', 'qrcode')


def table_Dashboard():
    connection = getConnection()
    all = """SELECT Date,
    (SELECT COUNT(*) as Fullmoto FROM data_user 
    JOIN type_vehicle ON type_vehicle.ID = data_user.Type_Vehicle 
    WHERE data_user.Type_Vehicle = '1') as AllMoto,
    (SELECT COUNT(*) as Fullcar FROM data_user 
    JOIN type_vehicle ON type_vehicle.ID = data_user.Type_Vehicle 
    WHERE data_user.Type_Vehicle = '2' and data_user.Active ='A') as Allcar,
    b.actualcar, c.actualMoto
    FROM vechine_today
    JOIN
    (SELECT COUNT(*) as actualcar, Date asfff FROM vechine_today
    LEFT OUTER JOIN data_user ON data_user.Employee_ID = vechine_today.Employee_ID
    LEFT OUTER JOIN type_vehicle ON type_vehicle.ID = data_user.Type_Vehicle
    WHERE data_user.Type_Vehicle = '2' and data_user.Active ='A'
    GROUP BY vechine_today.Date) as b
    ON b.asfff = vechine_today.Date
    JOIN
    (SELECT COUNT(*) as actualMoto, Date asfff FROM vechine_today
    LEFT OUTER JOIN data_user ON data_user.Employee_ID = vechine_today.Employee_ID
    LEFT OUTER JOIN type_vehicle ON type_vehicle.ID = data_user.Type_Vehicle
    WHERE data_user.Type_Vehicle = '1' and data_user.Active ='A'
    GROUP BY vechine_today.Date) as c
    ON c.asfff = vechine_today.Date
    GROUP BY vechine_today.Date
    ORDER BY Date DESC"""
    cursor = connection.cursor()
    cursor.execute(all)
    all = cursor.fetchall()

    return all


def get_company(input):
    data = ''
    connection = getConnection()
    sql = "SELECT * from company"
    cursor = connection.cursor()
    cursor.execute(sql)
    company = cursor.fetchall()
    for c in company:
        if c['Detail'] == input:
            data = c['ID']
    return data


def get_agency(input):
    data = ''
    connection = getConnection()
    sql = "SELECT * from agency"
    cursor = connection.cursor()
    cursor.execute(sql)
    agency = cursor.fetchall()
    for a in agency:
        if a['Detail'] == input:
            data = a['ID']
    return data


def get_company_dormitory(input):
    data = ''
    connection = getConnection()
    sql = "SELECT * from company_dormitory"
    cursor = connection.cursor()
    cursor.execute(sql)
    company_dormitory = cursor.fetchall()
    if str(input) == 'nan':
        data = "ไม่ใช่"
    else:
        for cd in company_dormitory:
            if input == cd['Detail']:
                data = cd['ID']
    return data


def get_zone(input):
    data = ''
    connection = getConnection()
    sql = "SELECT * from zone"
    cursor = connection.cursor()
    cursor.execute(sql)
    zone = cursor.fetchall()
    if input != 'nan':
        input = input.upper()
    for z in zone:
        if z['Detail'] == input:
            data = z['ID']
    return data


def get_type_vehicle(input):
    data = ''
    connection = getConnection()
    sql = "SELECT * from type_vehicle"
    cursor = connection.cursor()
    cursor.execute(sql)
    type_vehicle = cursor.fetchall()
    for tv in type_vehicle:
        if tv['Detail'] == input:
            data = tv['ID']
    return data


def upload_user(data, data_user):
    for d in range(len(data)):
        Employee_ID = str(data['รหัสพนักงาน'][d])
        Name = data['ชื่อ-สกุล'][d]
        if str(data['เบอร์โทร'][d]) == 'nan':
            Phone = 'nan'
        else:
            Phone = "0"+str(int(float(data['เบอร์โทร'][d])))
        Agency = get_agency(data['หน่วยงาน'][d])
        Company = get_company(data['Company'][d])
        Company_dormitory = get_company_dormitory(
            str(data['อยู่หอพัก บริษัท'][d]))
        connection = getConnection()
        sql = f"""INSERT INTO user(Employee_ID, Name, Phone, Agency, Company, Company_dormitory) VALUES 
        ('{Employee_ID}','{Name}','{Phone}','{Agency}','{Company}','{Company_dormitory}')"""
        print(sql)
        try:
            cursor = connection.cursor()
            cursor.execute(sql)
            connection.commit()
        except:
            print('insert fail')
    upload_data_user(data_user)
    return print('upload data_user success')


def upload_data_user(data_user):
    for du in range(len(data_user)):
        Employee_ID = str(data_user['รหัสพนักงาน'][du])
        Type_Vehicle = get_type_vehicle(data_user['ประเภทรถ'][du])
        Car_Regitation = data_user['ทะเบียนรถ'][du]
        Zone = get_zone(data_user['ZONE'][du])
        connection = getConnection()
        sql = "INSERT INTO data_user(Employee_ID, Type_Vehicle, Car_Regitation, Zone, Active_Status) VALUES ('%s','%s','%s','%s','%s')" % (
            Employee_ID, Type_Vehicle, Car_Regitation, Zone,"A")
        cursor = connection.cursor()
        try:
            cursor.execute(sql)
            connection.commit()
        except:
            print('insert fail')


def insertdataonly(Employee_ID, Name, Phone, Agency, Company, Company_dormitory, Type_Vehicle, Car_Regitation, Zone,Status_type):
    connection = getConnection()
    sql1 = f"""INSERT INTO data_user(Employee_ID, Type_Vehicle, Car_Regitation, Zone, Active_Status) VALUES 
    ('{Employee_ID}','{Type_Vehicle}','{Car_Regitation}','{Zone}','{Status_type}')"""
    sql2 = f"""INSERT INTO user(Employee_ID, Name, Phone, Agency, Company, Company_dormitory) VALUES 
        ('{Employee_ID}','{Name}','{Phone}','{Agency}','{Company}','{Company_dormitory}')"""
    cursor = connection.cursor()
    try:
        cursor.execute(sql2)
        cursor.execute(sql1)
        connection.commit()
    except:
        print('insert fail')


def gen_qrcode_only(data):
    url = "https://a41e-184-82-103-244.ap.ngrok.io"
    connection = getConnection()
    sql = "INSERT INTO receive_qrcode(Employee_ID) VALUES ('%s')" % (data)
    cursor = connection.cursor()
    try:
        cursor.execute(sql)
        connection.commit()
    except:
        print('insert fail')
    qr = pyqrcode.create(url+"/User/"+str(data))
    filename = "./qrcodeonce/"+str(data)+".png"
    qr.png(filename, scale=6)


def find_edit(user):
    connection = getConnection()
    sql = f"""
    SELECT user.Employee_ID, user.Name, user.Phone, agency.Detail as Agency, company.Detail as company, 
    company_dormitory.Detail as company_dormitory, data_user.Car_Regitation as car_regis, type_vehicle.Detail as type_vehicle,
    zone.Detail as Zone, receive_sticker.WhenDate as receive_sticker_Date, receive_sticker.Recipient as recipName, receive_sticker.ID as id, data_user.Active
    from user
    JOIN agency ON agency.ID = user.Agency
    JOIN company ON company.ID = user.Company
    JOIN company_dormitory ON company_dormitory.ID = user.Company_dormitory
    JOIN data_user ON data_user.Employee_ID = user.Employee_ID
    JOIN type_vehicle ON type_vehicle.ID = data_user.Type_Vehicle
    JOIN zone ON zone.ID = data_user.Zone
    JOIN receive_sticker ON receive_sticker.Employee_ID = user.Employee_ID
    WHERE user.Employee_ID = '{user}' ORDER BY id ASC
    """
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    return data


def update_user(Employee_ID, Name, Phone, Agency, Company_dormitory, Type_Vehicle, Car_Regitation, Zone,Status_type):
    connection = getConnection()

    Agency = get_agency(str(Agency))
    Company_dormitory = get_company_dormitory(str(Company_dormitory))
    Type_Vehicle = get_type_vehicle(Type_Vehicle)
    Zone = get_zone(Zone)

    sql1 = f"""UPDATE user SET Employee_ID='{Employee_ID}', Name='{Name}', Phone='{Phone}', Agency='{Agency}', 
    Company_dormitory='{Company_dormitory}' WHERE Employee_ID = '{Employee_ID}'
    """
    sql2 = f"""UPDATE data_user SET Type_Vehicle='{Type_Vehicle}', Car_Regitation='{Car_Regitation}', 
    Zone='{Zone}' , Active_Status ='{Status_type}' WHERE Employee_ID ='{Employee_ID}' and Type_Vehicle='{Type_Vehicle}'
    """
    try:
        cursor = connection.cursor()
        cursor.execute(sql1)
        cursor.execute(sql2)
        connection.commit()
    except:
        print('Update fail')


def visitor_gen(Detail, Name, Car_regis):
    connection = getConnection()
    sql1 = f"""INSERT INTO visitor_detail(Why, Name, Car_registration) VALUES ('{Detail}', '{Name}', '{Car_regis}')"""
    cursor = connection.cursor()
    try:
        cursor.execute(sql1)
        connection.commit()
    except:
        print('insert fail')
    url = "https://a41e-184-82-103-244.ap.ngrok.io"
    qr = pyqrcode.create(url+"/Visitor/"+str(Detail))
    filename = "./qrcodeonce/"+str(Detail)+".png"
    qr.png(filename, scale=6)


def columnDashboardVisitor():
    connection = getConnection()
    sql = """SELECT vechine_today.Date as Date FROM vechine_today
    JOIN visitor ON visitor.Date = vechine_today.Date
    GROUP BY visitor.Date"""
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    column = [item["Date"].strftime("%Y-%m-%d") for item in data]
    return column


def dataactualrowDahboardVisitor():
    connection = getConnection()
    sql = """SELECT COUNT(*) as Data FROM vechine_today
    JOIN visitor ON visitor.Date = vechine_today.Date
    GROUP BY visitor.Date"""
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    row = [item["Data"] for item in data]
    return row


def datavisitorrowDahboardVisitor():
    connection = getConnection()
    sql = """SELECT COUNT(*) as Data FROM Visitor
    GROUP BY visitor.Date"""
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    row = [item["Data"] for item in data]
    return row


def tablevisitor():
    connection = getConnection()
    all = """SELECT Visitor.Date, b.Data as OnPass, c.Data as Visitor
             FROM vechine_today
             JOIN Visitor ON Visitor.Date = vechine_today.Date
             JOIN 
             (SELECT COUNT(*) as Data, Visitor.Date as bDate FROM vechine_today
             JOIN visitor ON visitor.Date = vechine_today.Date
             GROUP BY visitor.Date) as b
             ON b.bDate = Visitor.Date
             JOIN
             (SELECT COUNT(*) as Data, Date as cDate FROM Visitor
             GROUP BY visitor.Date) as c
             ON c.cDate = b.bDate
             GROUP BY vechine_today.Date
             ORDER BY Visitor.Date DESC"""
    cursor = connection.cursor()
    cursor.execute(all)
    all = cursor.fetchall()
    return all

def agency_select():
    connection = getConnection()
    sql = "SELECT * FROM agency"
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    return data

def type_vehicle_select():
    connection = getConnection()
    sql = "SELECT * FROM type_vehicle"
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    return data

def zone_select():
    connection = getConnection()
    sql = "SELECT * FROM zone"
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    return data

def status_detail_select():
    connection = getConnection()
    sql = "SELECT * FROM status_detail"
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    return data

def company_select():
    connection = getConnection()
    sql = "SELECT * FROM company"
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    return data

def company_dormitory_select():
    connection = getConnection()
    sql = "SELECT * FROM company_dormitory"
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    return data