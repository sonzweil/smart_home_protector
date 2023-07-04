import cv2
import numpy as np

capCamera1 = cv2.VideoCapture(0)
capCamera2 = cv2.VideoCapture(1)

while True:
    isNextFrameAvail1, frame1 = capCamera1.read()
    isNextFrameAvail2, frame2 = capCamera2.read()

    if not isNextFrameAvail1 or not isNextFrameAvail2:
        break

    frame2Resized = cv2.resize(frame2, (frame1.shape[0], frame1.shape[1]))

    # ---- Option 1 ----

    # numpy_vertical = np.vstack((frame1, frame2))
    numpy_horizontal = np.hstack((frame1, frame2))

    # ---- Option 2 ----

    # numpy_vertical_concat = np.concatenate((frame1, frame2), axis=0)
    # numpy_horizontal_concat = np.concatenate((frame1, frame2), axis=1)
    cv2.imshow("Result", numpy_horizontal)
    cv2.waitKey(1)