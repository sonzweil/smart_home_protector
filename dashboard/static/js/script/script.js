// Create ros object to communicate over your Rosbridge connection
const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });
ros.connect('ws://0.0.0.0:9090');

// When the Rosbridge server connects, fill the span with id "status" with "successful"
ros.on("connection", () => {
  document.getElementById("status").innerHTML = "successful";
});

// When the Rosbridge server experiences an error, fill the "status" span with the returned error
ros.on("error", (error) => {
  document.getElementById("status").innerHTML = `errored out (${error})`;
});

// When the Rosbridge server shuts down, fill the "status" span with "closed"
ros.on("close", () => {
  document.getElementById("status").innerHTML = "closed";
});


var cmd_vel_listener = new ROSLIB.Topic({
  ros: ros,
  name: '/cmd_vel',
  messageType: 'geometry_msgs/msg/Twist'
});

move = function (linear, angular) {
  var twist = new ROSLIB.Message({
    linear: { x: linear, y: 0.0, z: 0.0 },
    angular: { x: 0.0, y: 0.0, z: angular }
  });
  cmd_vel_listener.publish(twist)
}




// // ~/catkin_ws/src/Cranberry/Cranberry_web/dashboard/static/js/scripts.js
// // Written 2020-10-09 by whiteknight
// // https://whiteknight3672.tistory.com

// var ros = new ROSLIB.Ros();

// // rosbridge websocket server와의 연결을 생성합니다.
// ros.connect('ws://0.0.0.0:9090');

// ///////////////////ros 상태 관련 구문///////////////////
// // ros와의 연결 상태에 따라 상단 액션바의 색깔이 녹색, 회색, 빨간색으로 변동됩니다.

// // 이상이 생길 경우 다음 구문이 실행됩니다.
// ros.on('error', function (error) {
//   console.log(error);
//   document.getElementById('header').style.backgroundColor = "#f03737";
// });

// // 정상 연결
// ros.on('connection', function () {
//   console.log('Connection made!');
//   document.getElementById('header').style.backgroundColor = "#07a666";
// });

// // 연결 닫힘
// ros.on('close', function () {
//   console.log('Connection closed.');
//   document.getElementById('header').style.backgroundColor = "#a0a0a0";
// });

// // 서비스 및 변수 선언
// var topic = new ROSLIB.topic({
//   ros: ros,
//   name: '/cmd_vel',
//   messageType: 'geometry_msgs/msg/Twist'
// });

// let msg = new ROSLIB.Message({
//   linear: "{x: 0.0, y: 0.0, z: 0.0}",
//   angular: "{x: 0.0, y: 0.0, z: 0.0}}"
// });

// function publish() {
//   msg.linear.x = document.getElementById('msg').value
//   document.getElementById('msg').value = ''
//   topic.publish(msg)
// }

// window.onload = () => {

//   topic.subscribe((res) => {

//       document.getElementById('subscribe').innerHTML = res.data

//   })

// }



// var iLightClient = new ROSLIB.Service({
//   ros: ros,
//   name: '/comm_light',
//   serviceType: 'cranberry_topic/CommLight'
// });



// // 창이 불러와졌을 때 다음 구문을 실행합니다.
// window.onload = function () {
// 	// index.html에서 id가 light_01인 요소를 클릭했을 때, update_light 함수가 실행합니다.
//   document.getElementById("light_01").onclick = function () { update_light("light_01"); }
// }


// function update_light(light_id) {
//   // html에 존재하는 요소 자체의 값을 읽어와 처리합니다.
//   if (document.getElementById(light_id).innerHTML == 0) { state = 1; document.getElementById(light_id).innerHTML = 1; }
//   else if (document.getElementById(light_id).innerHTML == 1) { state = 0; document.getElementById(light_id).innerHTML = 0; }

//   //문자열 데이터 'light_id'를 숫자 데이터로 변환합니다.
//   var light_num = Number(light_id.split('_')[1]);

//   //target과 state에 대한 정보를 포함하는 toggle_light Request를 만듭니다.
//   //이 request 값은 한 번 선언되면 변치 않는 것 같습니다. 따라서 매 update_light 함수가 실행될 때마다 선언합니다.
//   var toggle_light = new ROSLIB.ServiceRequest({
//     target: light_num,
//     state: state
//   });

//   //위에서 선언한 서비스를 호출합니다.
//   iLightClient.callService(toggle_light, function (result) {
//     console.log("result : " + toggle_light.target + ':' + result.result)
//     // 시각적으로 상태를 파악하도록 ROS에서 준 response에 따라 CSS 스타일을 업데이트합니다.
//     if (result.result == 1) {
//       document.getElementById(light_id).style.backgroundColor = "#FFE600";
//       document.getElementById(light_id).style["boxShadow"] = "0 0 12px 4px rgba(187, 137, 0, 0.5)";
//     }
//     else if (result.result == 0) {
//       document.getElementById(light_id).style.backgroundColor = "#808080";
//       document.getElementById(light_id).style["boxShadow"] = "0 0 6px 3px rgba(0, 0, 0, 0.5)";;
//     }
//     else {
//       document.getElementById(light_id).style.backgroundColor = "#ff0000";
//       document.getElementById(light_id).style["boxShadow"] = "0 0 6px 3px rgba(0, 0, 0, 0.5)";;
//     }
//   });
// }


// // Create a listener for /turtle1/pose
// var my_topic_listener = new ROSLIB.Topic({
//   ros,
//   name: "/turtle1/pose",
//   messageType: "turtlesim/msg/Pose",
// });

// // When we receive a message on /my_topic, add its data as a list item to the "messages" ul
// my_topic_listener.subscribe((message) => {
//   const ul = document.getElementById("messages");
//   const newMessage = document.createElement("li");
//   newMessage.appendChild(document.createTextNode(message.data));
//   ul.appendChild(newMessage);
// });
