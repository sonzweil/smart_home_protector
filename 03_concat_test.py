import cv2

camera1 = cv2.VideoCapture('http://192.168.0.46:8080/video')
camera2 = cv2.VideoCapture(0)

while True:
    ret1, frame1 = camera1.read()
    ret2, frame2 = camera2.read()

    frame = cv2.hconcat([frame1, frame2])
    cv2.imshow("Cameras", frame)

camera1.release()
camera2.release()