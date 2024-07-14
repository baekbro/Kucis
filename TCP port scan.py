#tcp scan
import socket

with socket.socket() as s:
    port= int(input('스캔할 포드를 입력하세요:'))
    addr=('192.168.163.1', port)
    try:
        s.connect(addr)
        print(port,'tcp socket is opend')
    except:
        print(port,'tcp socket is closed')
