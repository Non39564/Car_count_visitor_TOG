from fastapi import APIRouter, File, UploadFile
from fastapi.responses import FileResponse
from database.db import *
from datetime import datetime
import shutil
import pandas as pd
import os
from pydantic import BaseModel
import secrets

route = APIRouter()


@route.get('/data_user')
async def data_user():
    data = get_data_user()
    return data

@route.get('/visitor_user')
async def visitor_user_detail():
    detail = visitor_user()
    return detail

@route.get('/User/{uid}')
async def User(uid: str):
    now = datetime.now()
    insert_time = now.strftime("%Y-%m-%d %H:%M:%S")
    user = User_data(uid)
    user.append(insert_time)
    return user

@route.get('/Visitor/{detail}')
async def User(detail: str):
    now = datetime.now()
    insert_time = now.strftime("%Y-%m-%d %H:%M:%S")
    visitor = Visitor_data(detail)
    visitor.append(insert_time)
    return visitor

@route.get('/chart_data_dashboard')
async def Column():
    data = columnDashboard()
    row = dataactualrowDahboard()
    dataall = dataallrowDahboard()
    return data, row, dataall

@route.get('/table_data_dashboard')
async def Table():
    data = table_Dashboard()
    return data

@route.post("/upload/file/")
async def create_upload_file(file: UploadFile = File(...)):
    try:
        with open(file.filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        data = pd.read_excel(file.filename,sheet_name='receive_sticker')
        gen_qrcode(data)
        cwd = os.getcwd()
        file_path = cwd+"\qrcode.zip"
        shutil.rmtree(cwd+"\qrcode")
        shutil.rmtree(cwd+f"\{file.filename}")  #
        os.mkdir(cwd+"\qrcode")
        if os.path.exists(file_path):
            return {'status': 'Found'}
        return {'status': 'Not Found'}
    except:
        return {'status': 'Error'}


@route.post("/upload_data_user/")
async def upload_data_user(file: UploadFile = File(...)):
    try:
        with open(file.filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        user = pd.read_excel(file.filename,sheet_name='user')
        data_user = pd.read_excel(file.filename,sheet_name='data_user')
        upload_user(user,data_user)
        return {'status': 'success'}
    except:
        return {'status': 'Error'}

@route.get("/export_excel")
async def export_excel():
    cwd = os.getcwd()
    file_path = cwd+"\qrcode.zip"
    if os.path.exists(file_path):
        print("file found")
        headers = {'Access-Control-Expose-Headers': 'Content-Disposition'}
        return FileResponse(file_path, filename="qrcode.zip", headers=headers)
    else:
        print("file not found")
        return {"error" : "file not found"}

class User(BaseModel):
    Username: str
    Password: str

@route.post("/api/login")
def test_login(user: User):
    data = user.dict()
    print(data)
    if data['Username'] == "admin" and data['Password'] == "admin":
        status = {
            "status": "ok",
            "message": "Logged in",
            "accessToken": secrets.token_hex(177),
            "expiresIn": 60000,
            "user": {
                "id": 1,
                "fname": "admin",
                "lname": "admin",
                "username": "admin",
                "password": "admin",
                "email": "admin@admin.com",
                }
        }
    else:
        status = {
            "status": "error",
            "message": "Login failed"
        }
    return status

class Oncedata(BaseModel):
    Employee_ID: str
    Name: str
    Phone: str
    Agency: str
    Company: str
    Company_dormitory: str
    CarRegis: str
    Type_vehicle: str
    Zone: str
    Status_type: str

@route.post("/insertOnce")
async def insertOnce(data: Oncedata):
    data = data.dict()
    Employee_ID = data["Employee_ID"]
    Name = data["Name"]
    Phone = data["Phone"]
    Agency = data["Agency"]
    Company = data["Company"]
    Company_dormitory = data["Company_dormitory"]
    Type_Vehicle = data["Type_vehicle"]
    Car_Regitation = data["CarRegis"]
    Zone = data["Zone"]
    Status_type = data['Status_type']
    print(Zone)
    # insertdataonly(Employee_ID, Name, Phone, Agency, Company, Company_dormitory, Type_Vehicle, Car_Regitation, Zone, Status_type)
    return {"data" : "Success"}

class Oncedata_gen(BaseModel):
    Employee_ID: str
    
@route.post("/insertOnce_gen")
async def insertOnce_gen(data: Oncedata_gen):
    data = data.dict()
    Employee_ID = data["Employee_ID"]
    gen_qrcode_only(Employee_ID)
    return {"data" : "Success"}

@route.get("/downloadOnce_gen/{Employee_ID}")
async def download_gen(Employee_ID: str):
    cwd = os.getcwd()
    Employee_ID = Employee_ID
    file_path = cwd+f"\qrcodeonce\{Employee_ID}.png"
    print(Employee_ID)
    if os.path.exists(file_path):
        print("file found")
        headers = {'Access-Control-Expose-Headers': 'Content-Disposition'}
        return FileResponse(file_path, filename=f"{Employee_ID}.png", headers=headers)
    return {'error': 'file not found'}

@route.get('/search_data/{Employee_ID}')
async def insertOnce_gen(Employee_ID: str):
    data = find_edit(Employee_ID)
    return data

@route.post("/updateuser")
async def insertOnce_gen(data: Oncedata):
    data = data.dict()
    Employee_ID = data["Employee_ID"]
    Name = data["Name"]
    Phone = data["Phone"]
    Agency = data["Agency"]
    Company = data["Company"]
    Company_dormitory = data["Company_dormitory"]
    Type_Vehicle = data["Type_vehicle"]
    Car_Regitation = data["CarRegis"]
    Zone = data["Zone"]
    Status_type = data['Status_type']
    update_user(Employee_ID, Name, Phone, Agency, Company_dormitory, Company, Type_Vehicle, Car_Regitation, Zone, Status_type)
    return {"data" : "Success"}
    
@route.get('/chart_data_dashboard_visitor')
async def Column():
    data = columnDashboardVisitor()
    row = dataactualrowDahboardVisitor()
    dataall = datavisitorrowDahboardVisitor()
    return data, row, dataall

@route.get('/table_visitor')
async def ColumnVisitor():
    data = tablevisitor()
    return data

class visitor_Once(BaseModel):
    Name: str
    Detail: str
    car_regis: str

@route.post("/insertOnce_gen_visitor")
async def insertOnce_gen_visitor(data: visitor_Once):
    data = data.dict()
    Name = data["Name"]
    Detail = data["Detail"]
    car_regis = data["car_regis"]
    print(Detail, Name, car_regis)
    visitor_gen(Detail, Name, car_regis)
    return {"data" : "Success"}

@route.get("/downloadOnce_gen_visitor/{Employee_ID}")
async def download_gen(Employee_ID: str):
    cwd = os.getcwd()
    Employee_ID = Employee_ID
    file_path = cwd+f"\qrcodeonce\{Employee_ID}.png"
    print(Employee_ID)
    if os.path.exists(file_path):
        print("file found")
        headers = {'Access-Control-Expose-Headers': 'Content-Disposition'}
        return FileResponse(file_path, filename=f"{Employee_ID}.png", headers=headers)
    return {'error': 'file not found'}

@route.get('/agency')
async def agency():
    data = agency_select()
    return data

@route.get('/type_vehicle')
async def type_vehicle():
    data = type_vehicle_select()
    return data

@route.get('/zone')
async def zone():
    data = zone_select()
    return data

@route.get('/status_detail')
async def status_detail():
    data = status_detail_select()
    return data

@route.get('/company')
async def company():
    data = company_select()
    return data

@route.get('/company_dormitory')
async def company_dormitory():
    data = company_dormitory_select()
    return data