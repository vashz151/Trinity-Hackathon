# import neccessary libraries
import mysql.connector as conn

db = []


def get_data():
    global db
    con = conn.connect(host='localhost', database='trinity', user='root',
                       password='vashz151', charset='utf8', port=3306)
    cursor = con.cursor()
    sql = 'select * from register'
    cursor.execute(sql)
    result = cursor.fetchall()
    print(result)
    # for each row in result append it to db list
    for i in result:
        l = []
        l.append(i[0])
        string = i[1][1:-2]
        nums = []
        for x in string.split():
            nums.append(float(x.strip()))
        l.append(nums)
        db.append(l)
    cursor.close()
    con.close()
    # print(result)
    print(db)


get_data()
