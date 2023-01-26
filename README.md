Frontend Developer Test

> TodoList

        + สามารถเพิ่ม/ลบ และ แก้ไขได้ 
        + เก็บข้อมูลที่เพิ่มไปเมื่อเปิดมาใหม่จะเป็นข้อล่าสุดที่ได้ทำการบันทึกไว้
        + สามารถกดติ้กได้ ว่าอันไหนที่ทำเสร็จไปแล้ว
        + เมื่อทำการเปิดขึ้นมาใหม่ รายการที่เคยติ้กไปว่าทำเสร็จต้องยังอยู่


> Movie
> เรียกใช้ API จาก https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&query=a

        ให้เราออกแบบหน้าตาเว็บไซต์ หรือ แอพ แสดงข้อมูลของภาพยนต์ให้สวยงาม พร้อมทั้งมีฟังก์ชัน 
        + ค้นหาชื่อของภาพยนต์
        สามารถเพิ่มราคาของหนังแต่ละเรื่อง
        + สามารถเลือกสินค้าใส่ตะกร้าได้
        + เมื่อซื้อหนังมากกว่า 3 รายการลด 10%, มากกว่า 5 รายการลด 20%
        + เมื่อทำการการปิดเว็บไซต์ และ มีการเปิดขึ้นมาใหม่สินค้าที่เคยเลือกไปจะยังคงอยู่ในตะกร้าสินค้า
        + สามารถกด Clear ตะกร้าสินค้าได้
        + เมื่อกดสั่งซื้อสินค้าแล้วให้มี Popup show ว่าต้องโอนเงินไปที่ไหน ภายในระยะเวลา 1 นาที (แสดงตัวเลขเวลาในการนับถอยหลังด้วย)


Framework: React

### Run Project
ติดตั้ง package: npm install
- to-do-list
ใช้คำสั่ง npm start
- movie_app
ใช้คำสั่ง npm run dev