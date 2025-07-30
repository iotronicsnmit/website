  
Team IoTronics 0 | Page 
 
Team IoTronics 
DEPARTMENT OF EEE, NMIT 
 
 
 
  
SWAT                                               
(SATELLITE BASED WATER ANALYSIS 
AND TRACKING) 
 
Project Authorship & Intellectual Acknowledgment 
The project details the creative and intellectual output of the IoTronics Club, 
which is housed within Nitte Meenakshi Institute of Technology, Department of 
Electrical and Electronics Engineering (EEE). 
The concept, design, research, and documentation have been developed entirely by 
the members of the club as part of our academic and innovation initiative. All 
technical content, architecture, flow, and ideation presented herein are original and 
a result of internal collaboration. 
This document is intended solely for academic evaluation, funding consideration, 
and institutional purposes. It may not be reproduced, circulated, or distributed—
 either partially or in full—without formal permission from the IoTronics Club and the 
EEE Department. Any unauthorized use, duplication, or external sharing is strictly 
discouraged and may be subject to academic or institutional review. 
All acknowledgments, rights, and representations made herein are duly aligned with 
the values and principles upheld by the College. 
1 | P a g e 
Team IoTronics 
1. Problem Statement 
Managing and tracking water levels in moving water tankers poses significant challenges in 
the logistics and utility sectors. Most current systems do not provide a reliable, real-time 
solution for determining whether a tanker is filled, partially filled, or empty.  
Additionally, GPS-based tracking of tankers is essential for operational transparency and 
monitoring providing a counter measurement to water tanker mafias.  
Links:  
Delhi’s tanker mafia —pipes, profits, politics 
Tanker economy revealed: Nexus between water mafia and politician’s controls supply in 
Bengaluru 
Do private water tankers exhibit mafia-like behavior 
2. Project Objectives 
• To develop a prototype using GPS functionality for real-time tanker tracking. 
• To integrate sensor that monitors water level in a tanker using an external non
contact sensor. 
• To transmit sensor and location data over a cellular network. 
• To visualize the data using a cloud-based platform with a dashboard including a 
map widget. 
• To ensure the design is ideated and documented to be scalable for real-world 
deployment. 
3. Project Highlights 
• Instead of using 2g module, we are going with 4g module, meaning it will 
transmit data over 4g/LTE cellular network rather than 2G based GSM 
module. 
o Note: The module / development board used in the project is also 
backward compatible with 2G network. 
• The design of the project is autonomous in nature, meaning the driver or any 
other unauthorized person will have no access to the hardware or the 
software components  
2 | P a g e 
Team IoTronics 
• Turning off GPS location without the permission of the authorized person will 
be prohibited. (The driver will not have any control for turning off the GPS 
module)  
• The project is suitable for almost all types of water trucks including non
hybrid type tankers. 
Non – Hybrid: The water tanker could be separated from the carrying vehicle 
(in the case, it is a tractor)  
Considering this case we will deploy/install the device on the water tank 
body and not the main vehicle dashboard. 
Hybrid: The carrying vehicle and water tank are attached. In this case also 
the project module will be attached to the water tank body only. 
3 | P a g e 
Team IoTronics 
4. System Overview 
Inputs: 
• Water level information from ultrasonic sensor (JSN-SR04T) 
• Location data from GNSS module (SIM A7672S) 
Processing: 
• Arduino Uno R3 handles sensor input, GPS data, and communication 
Communication: 
• Data sent through GSM/LTE network using SIM A7672S over (HTTP/HTTPs/MQTT) 
protocols 
Output: 
• Data displayed on TagoIO dashboard with map widget and sensor status 
5. Technical Components (Phase 1) 
Component 
Description 
Operating 
Voltage 
Arduino Uno 
R4 Wi-Fi 
Microcontroller board 
5V 
Interface Notes 
UART, 
GPIO 
JSN-SR04T 
Waterproof Ultrasonic 
Distance Sensor 
5V 
Digital 
Central control unit 
Water Proof ultrasonic 
sensor used for water 
level detection 
SIM A7672S 
Dev Board 
GSM/LTE + GNSS 
module 
5V-12V 
input, 3.8V 
internal 
Power Supply 
DC power supply 
module (Power Bank 
with Break out Boards) 
5V 
UART - 
Development Board for 
GNSS for GPS + GSM for 
data transmission 
To power entire circuit 
4 | P a g e 
Team IoTronics 
SIM A7672S Dev Board: 
Additional Components Required with this Dev Board:  
Product Link:  
https://www.ktron.in/product/sim-a7672s-4g-lte-2g-gnss-development
board/?v=c86ee0d9d7ed 
5 | P a g e 
Team IoTronics 
JSN-SR04T 
Product Link: 
https://robocraze.com/products/waterproof-ultrasonic-sensor 
Arduino Uno R4- Wi-Fi 
Product Link:  
https://robocraze.com/products/uno-smd-board-compatible-with-arduino 
6 | P a g e 
Team IoTronics 
6. Software Components 
• Firmware: Arduino IDE for code development 
• Communication: AT(‘Attention’) Commands for GSM/GNSS modules 
Demo Code:  
• Cloud Dashboard: TagoIO (provides device linking, dashboard, and map widget) 
Demo Visual:  
Special Note: SIM Card Requirement: 
A standard-size(nano) SIM card is required for the project. The SIM card must support 2G, 
3G, 4G LTE networks (as supported by the SIM A7672S module). It should have an active 
data plan with internet access enabled. Ensure the SIM is unlocked (no PIN lock) and 
7 | P a g e 
Team IoTronics 
capable of operating on bands available in your region. This SIM enables the GSM module 
to transmit water level and GPS location data to the cloud platform. 
Preferrable Sim Companies: Airtel, VI (As per reviews from official websites)  
7. Block Diagram and System Flow  
1. JSN-SR04T collects water level data 
2. SIM A7672S collects GPS location from satellites 
3. Arduino reads both data points 
4. Arduino process and sends the combined data over GSM using A7672S 
5. Data received at Tago IO cloud 
6. Dashboard visualizes: 
o Tanker location on map 
o Current water level (status or distance) 
8 | P a g e 
Team IoTronics 
7.1 Block Diagram for Connection  
8. Installation Considerations 
• Sensor and module enclosure mounted over tanker cap with secure sealing 
• Transparent IP65-rated enclosure used for protection 
• Wiring managed to move along with cap for maintenance 
• No additional holes or wiring stress during opening/closing of the cap 
9 | P a g e 
Team IoTronics 
Probable 
Deployment 
Area 
9. Business Model  
The proposed system is designed for large-scale deployment and aligns well with public   
infrastructure and water management goals. As such, the business model is centered 
around government-organized implementation, either fully funded or operated under 
public-private partnerships (PPP). 
Deployment and maintenance would ideally be managed by government bodies such as 
municipal corporations, water supply boards, or state utility departments. 
10 | P a g e 
Team IoTronics 
9.1 Government Initiatives & Policy Support 
1. Karnataka – “Sanchari Cauvery” Initiative:  
Launched by BWSSB in Bengaluru to regulate water tanker supply, combat mafia
run services, and fix prices across the city. 
https://www.hindustantimes.com/cities/bengaluru-news/karnataka-govt
launches-sanchari-cauvery-to-tackle-water-tanker-mafia-101746806723868.html 
2. Delhi – GPS-Enabled Water Tankers: 
Delhi Jal Board deployed 1,000+ GPS-tracked tankers to enhance transparency, 
curb misuse, and ensure timely distribution. Chief Minister Rekha Gupta 
emphasized live monitoring and real-time data collection to curb the “water mafia”. 
https://economictimes.indiatimes.com/news/india/1000-gps-enabled-water
tankers-in-delhi-parvesh-verma-gives-key-update-on-boosting-water-supply
during-summer/articleshow/120423312.cms?from=mdr 
9.2 Government Grants & Incubation Programs 
1. Startup India Seed Fund Scheme (SISFS) 
Provides funding up to ₹50 lakh for proof-of-concept, prototype development, 
product trials, market entry, and commercialization 
https://seedfund.startupindia.gov.in/ 
2. Electronics Development Fund (EDF) 
Offers funding for hardware and IoT innovation, supporting up to 50% of total 
project cost (up to ₹50 Cr)  
https://edfindia-canbankventure.com/ 
3. Atal Innovation Mission (AIM) 
Under NITI Aayog, provides incubation support via Atal Incubation Centers, 
fostering student-led deep-tech startups 
https://en.wikipedia.org/wiki/Atal_Innovation_Mission? 
Other Programs and Schemes: 
https://www.jasaro.in/post/government-schemes-for-startups? 
11 | P a g e 
Team IoTronics 
10. Reliability and Fail-Safes 
To ensure the system remains dependable and operational in real-world deployment, 
several mechanisms are considered: 
1. Secure Communication via HTTPS 
The SIM A7672S module supports HTTPS protocol using AT commands, allowing 
encrypted data transfer over secure connections. This ensures GPS and sensor 
data are transmitted safely without exposure to interception. 
2. Last Known Location Persistence 
The dashboard (Tago IO) retains the last successfully received GPS coordinates. In 
the event of power loss or disconnection, the last known location remains visible on 
the UI map until new data is received, ensuring uninterrupted monitoring reference. 
3. Auto-Troubleshoot and Remote Reset 
A watchdog timer is planned for integration to automatically restart the 
microcontroller in case of system hangs or communication failures. Additionally, 
logic can be implemented to detect prolonged inactivity or absence of new data. In 
such cases, a soft reset command can be sent to the GSM module or entire system 
from the backend or dashboard side. This forms part of a remote troubleshooting 
mechanism, enabling recovery without physical access. These automated and 
manual fallback methods help maintain consistent device uptime. 
11. Additional measurement parameters that could be added  
• Fuel Tank level (as shown in demo UI dashboard)  
• Tires Pressure  
• Details of Vehicle (Color, Number Plate etc.) 
• Details and Contact number of Driver  
12. Areas of Research and Future Scope (Deployment Level) 
A. Water Level Measurement: 
a. Measuring bulk amounts of water accurately in environments like enclosed 
water tankers is quite challenging.  
b. The use of better measuring techniques and modules is one of the prominent 
research aspects in this project. Ex. (A design or innovation that is capable of 
detecting water levels externally without any temperament in tanker’s body)  
12 | P a g e 
Team IoTronics 
B.  Power Supply: 
a. For demonstration purposes, we are just using a 5V/3A battery supply. 
b. But this might not be a good choice for practical deployment of this project.  
c. Alternate Power sources:  
i. Utilizing the vehicle battery as the primary power source, integrating 
essential electronic components (resistors, capacitors, transistors) to 
ensure a stable and regulated supply. 
ii. Use of Rechargeable Batteries with constant monitoring.  
Note: Not considering renewable power sources like small solar panels as they 
would increase the cost of projects (much higher comparatively) and we 
wouldn’t get a stable voltage and current from it at every hour of the day.   
C. Security:  
a. Security in Hardware: Using good quality cases and hidden wiring that would 
prevent any natural or artificial tampering with the entire module. 
b. Security in Software:  
i. Better Autonomous Systems: The project is especially designed for end 
users (i.e. public). Deploying mechanisms that could detect and send 
alerts on any type of tampering will be one of the prominent goals.  
ii. Auto Troubleshooting: In case of any connection’s errors (internal or 
external) module should be able to troubleshoot itself or restart the 
functionality without human prevention.  
iii. Security in Protocols: Security in IoT is one such prominent field which 
keeps on improving day and night, as new attacks are discovered. 
Using the latest firmware security protocols and mechanisms at the 
time of deployment should be kept at priority.  
13. Cost Cutting Parameters at the time of deployment  
1. Unified Custom PCB Design: 
After successful prototyping, a single custom-designed PCB integrating the 
microcontroller, GSM/GNSS module, and sensor interface can be developed. 
This eliminates the need for multiple development boards and simplifies the 
assembly, significantly reducing the per-unit cost in large-scale production. 
2. Use of Budget IoT SIM Plans: 
Opting for dedicated IoT SIM cards or low-cost data-only plans minimizes 
recurring operational costs. 
These plans are optimized for machine-to-machine (M2M) communication and are 
cost-effective in bulk usage scenarios. 
3. Bulk Ordering and Industry Partnerships: 
Partnering with local manufacturers or suppliers for bulk procurement of sensors, 
13 | P a g e 
Team IoTronics 
enclosures, and modules can lead to discounts and reduced shipping/handling 
costs. 
It also opens opportunities for potential government or institutional 
collaboration, further reducing unit economics. 
14. Conclusion 
This ideation documents the development of a real-world applicable project that tracks 
both water level and GPS location of tankers using affordable hardware, cloud software, 
and real-time dashboards. It bridges the gap between academic prototyping and 
deployable IoT systems, allowing for future expansion and product-level deployment. 
End of Document 
Project Credentials:  
Rounak Vyas (Designer and Developer)  
Email: rounakvyas7@gmail.com 
Contact Info: +91 8005863350  
LinkedIn Profile: https://www.linkedin.com/in/rounak-vyas-453b08345/ 
Rohit Soni (Co – Designer)  
Email: 1nt23ee044.rohit@nmit.ac.in 
Contact info: 6354959448 
LinkedIn Profile: https://www.linkedin.com/in/rohit-soni-7410681aa/ 
This document is a proprietary academic submission developed by the IoTronics Club, Department of 
Electrical and Electronics Engineering, NMIT, Bengaluru. Unauthorized copying, distribution, or 
reproduction of any part of this document is strictly prohibited without prior written consent from the project 
team and the department. 
14 | P a g e 
Team IoTronics 