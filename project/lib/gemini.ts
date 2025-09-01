import { GoogleGenAI } from "@google/genai";

// Initialize the Google Generative AI with a direct API key
// This is not ideal for production but will work for development
const API_KEY = "AIzaSyAOWTS_XWgbfXk9xtsJyN05nvhAFje2dE8";
const ai = new GoogleGenAI({
  apiKey: API_KEY
});

// This is our knowledge base from the existing responses
const knowledgeBase = `

# SARA - Student Academic Registration Assistant Knowledge Base

## School History
### The Founding Years
Saint Joseph College was founded on February 20, 1928 by His Excellency Most Reverend Sofronio G. Hacbang, D.D. (1887-1937) Bishop of Calbayog Diocese to which the whole of Samar and Leyte canonically belonged. It was first named Instituto de San Jose. Its primary purpose was to offer Catholic education through which the Church could fulfill its work of evangelization. In June, 1928, the school welcomed its first elementary and secondary students whose classes were held in a provisional school building made of light materials. Two years after, the school got recognition from the government for the said courses.

The Founder-Bishop entrusted the leadership of the school to the diocesan priests assigned as parish priest of the Parish of Our Lady of the Assumption, Maasin. The first School Director was Reverend Father Sofio Mandia who came to Maasin as parish priest in 1931.

### From Instituto to College
The year Bishop Hacbang died, a new diocese was created in 1937 – the Diocese of Palo covering the whole island of Leyte. The Instituto then was under the watchful eye of the new Bishop of Palo, Most Rev. Manuel M. Mascariñas, D.D. This time the Instituto progressed rapidly under the steering hands of Fr. Sofio Mandia. The increase of enrolment required new buildings. To answer the need of those who craved for higher education but who could not proceed elsewhere due to financial constraints, the school offered the Junior Normal College Course in 1940.

The outbreak of World War II interrupted classes from December 1941 to December 1944. When classes reopened in January, 1945, the Diocese of Palo asked the Benedictine Sisters to take over the administration of the school, marking the new epoch in the intellectual life of the Instituto. With Sister Godfrieda Baumeister, OSB as the Directress, the school progressed by leaps and bounds. New school buildings were constructed and facilities were improved to accommodate more students. In 1947, the government recognized the Junior Normal College Course, which paved the way to rename the school Saint Joseph Junior College. In 1949, Two-Year Preparatory Law and Third and Fourth Year of the Education Course were recognized by the state. Thus, in the later part of the year 1949 the Instituto de San Jose became Saint Joseph College after twenty-one years of existence.

From then on, the new college offered other collegiate courses to students. The government recognized the following: the complete Bachelor of Science in Education (BSE) and Two-Year General Liberal Arts Course in 1950; Two-Year Junior Normal Course in 1954; the One-Year Collegiate Secretarial Course in 1956; Two-Year Collegiate Commercial Course in 1958; Third-Year of the Four Year Collegiate Commercial Course and Third and Fourth Years of the Four-Year Liberal Arts Course (AB –General) in 1959; Third and Fourth Years of the Preparatory Law Course (AB-Pre Law) in 1960; Two-Year Collegiate Secretarial Course in 1961; Two-Year Special Vocational Secretarial Course in 1962; and Third and Fourth Years of the Collegiate Normal Course (BSEED) in 1965.

### The Quest for Quality and Excellence
On August 14, 1968, the new Diocese of Maasin was created by Blessed Pope Paul VI covering the whole newly created Province of Southern Leyte and extending to six municipalities of Leyte. The school’s supervision then was transferred from the Diocese of Palo to the Diocese of Maasin whose first Bishop was the Most Rev. Vicente T. Ataviado, D.D. (1929-1997).

In 1972, the Benedictine Sisters turned over the school administration to the Diocese of Maasin. The Lay Administration was headed by the President with Mr. Marcelino Hanopol Jr. as the first President. Serving as the advisory and policy-making body was the Board of Trustees with the Bishop of Maasin as the Chairman. The Lay Administration has taken over where the Benedictines left. It has continued the impetus for progress blazed by the past administrations, so that in the relatively short period of six years it has etched an indelible mark in the history of the school as it opened more courses and drove for quality and excellence: Third and Fourth Years of the Collegiate Commercial Course in 1973; The Night Secondary Course, One Year Course in Electronic Serviceman for Radio Receivers, Practical Electricity Course, Auto Mechanics Course, Civil Engineering Course, Preparatory Law Course, and Third and Fourth year of the Collegiate Commercial Course in 1974.

In 1978, the Bishop of Maasin, Most Rev.Vicente T. Ataviado, D.D., took over the Presidency of the school besides being the Chairman of the Board. In administering the school, he was assisted by Three Vice-Presidents-a Vice-President for Academics, a Vice-President for Finance and a Vice-President for General Services.

In 1979, the Sisters of Saint Francis of Perpetual Adoration (OSF) started working for the school upon the request of the Bishop of Maasin. The religious sisters served as administrators, teachers and campus ministers. In the same year, an additional school site at Mambajao, Maasin, was developed where the building for the Engineering department and part of the High School department was constructed. The new campus provided vast open space for various school and diocesan activities.

In the later part of 1981, the school had a new organizational set-up which was headed by the President assisted by the Presidential TROIKA instead of the three Vice-Presidents. It was during this time that the government fully recognized the five year course in Civil Engineering (BSCE) in 1985, Master of Arts in Education (MAED) in 1988, Four Year Course in Accountancy (BSA) in 1991, Associate in Computer Science (ACS) in 1994, and Associate in Computer Secretarial in 1995.

In 1995, Bishop Ataviado retired as School President and appointed Sister M. Anthony Kuizon, OSF to head the school. Under the new organizational set-up, the President was assisted by the Vice-President and the members of the Administrative and Academic Councils. Starting to rise also this time were the new grade school and the new college buildings to accommodate students of the newly offered courses which included in 1996 Master of Business Administration (MBA), Bachelor of Science in Computer Science (BSCS), Bachelor of Science in Secretarial Administration (BSSA), and two years later Bachelor of Science in Criminology (BSCrim).

### The Emphasis on School’s Professionalism and Catholic Character
In 1998, Most Rev. Precioso D. Cantillas, SDB, DD became the second Bishop of the Diocese of Maasin, a year after the death of Bishop Ataviado. He assumed the Presidency of the school in 2000. Since then a rapid growth and development of the school took place. Under his new leadership, the professional dimension of the school is pursued with vigor and its Catholic character given greater and renewed emphasis. He initiated reforms and innovations in organizations, operations, services, curricula, campus development and research.

This is the reason why before completing all the constructions of the school, the School President and at the same time the Bishop of Maasin dealt first with the formulation of the Vision, Mission, Goals of the School which would set the direction of the school which was professional, Christian and specifically Catholic in nature. Thus, in line with the School’s vision and mission, Bishop Cantillas created in 2001 the Theology Department with its own Dean to emphasize theology subjects as the core of everything the School is teaching to its college students who would now take theology subjects from first year to fourth year in college.

Moreover, alongside with feeding the young minds with knowledge is feeding the young and innocent souls with the Word of God and the Body of Christ through daily class mass (in elementary, high school, and college) recollection, and retreats. For this purpose, the School President constructed a recollection/retreat center in Macrohon called Shalom and put up or renovated chapels in elementary, high school, college, and extension campuses.

In 2001, the government recognized the course Bachelor of Science in Criminology (BSCrim) whose enrollees grew in giant strides so that the School Administration decided to finish the fourth floor of the new college building. In 2002, the grade school program was conferred PAASCU Level II accredited status.

In 2003, to take care of the out of school youth, the School President with the help from abroad, constructed the Vocational Training Center (VOCTRAC) producing skilled youth ready to work in companies here and abroad. From just two courses (Automotive NC II and Welding NC II) in the beginning, the Center together with TESDA offers Electrical Technology (NC III), Refrigeration and Air-Conditioning Technology (NC I), Consumer Electronics (NC II), Plumbing Technology (NC II), Computer Hardware Servicing (NC II), Short-Term Driving (NC II), Healthcare Services (NC II), Household Services (NC II), Housekeeping Services (NC II), and Bartending Services (NC II).

In 2007, the School offered Bachelor of Science in Office Administration (BSOA). The following year, the Administration Offices were transferred to the New College Building to give way to the construction of more classrooms for the High School students whose population increased rapidly.

In 2008, the Office of Planning and Research were established to articulate the School’s thrust towards research, service and development. School Year 2011-2012 marked the founding of the course Hotel and Restaurant Management occupying the fifth floor of the college building. The following year, the School inaugurated the Giuseppe Hotel and Restaurant and other HRM Facilities. St. Felicity and St. Rose of Lima Dormitories for female students were also blessed. Also this year, the Bachelor of Science in Information Technology (BSIT) got recognition from the government.

Mindful of its social responsibility, the School established in 2012 the Community Extension Service Office to handle the outreach programs and activities for the needy communities. The five year management and development plan was implemented since 2013 after the School President’s approval.

In 2013, the third and fourth storeys of the new high school building where the additional classrooms, the new principal’s office, and the new library are located were blessed by the School President. This year also saw the recognition of the Bachelor of Science in Accounting Technology.

In 2014, the Office for Public Affairs, Publications, and Alumni Relations was created with the purpose of making further the School play a vital role in public life and events by coordinating and facilitating SJC’s relationships with the communities (local, provincial, and national government), the media and the general public.

In compliance in the year 2016 with the Enhanced Basic Education Act of 2013 (Republic Act 10533), commonly known as the K to 12 Law which expanded the Philippines’ basic education to include a two-year senior high school (SHS) program, Saint Joseph College saw the rise of the new three-storey building in the middle campus at the back of the Maasin Cathedral to house the Senior High Students. Thus, the Godfrieda Covered Court and the wooden college building gave way to the new Senior High edifice and to the much bigger BGC or Bishop Cantillas Gym. With the influx of local and foreign tourists to the region and province of Southern Leyte, the School Administration opened a new course on tourism (BSTM) in year 2018.

In the academic year 2023-2024, with the rise of the demand for local professionals handling infrastructures, the School introduced BS Architecture to the delight of those who could not afford going outside the province or the region for the sought-after course. Commitment to Uphold the Mission in Synodality On June 24, 2024, after twenty-five years, the Most Reverend Bishop of Maasin, Bishop Precioso D. Cantillas, SDB, DD, passed on the presidency to the Executive Vice President, Msgr. Oscar A. Cadayona, PhD, SThL-MA.

On August 1, 2024, the new head was formally installed as the 5th School President of Saint Joseph College. In his inauguration, the new School President presented his Ten-Point Scholastic Agenda to help realize the Vision, Mission, Goals of the Catholic Institution as it is geared to its centenary: Back to Basics, Practice What is Taught, De-Construct in the Classrooms, Change for the Better, Oblation for Greater Good, Aspiration for a Big Dream, Corresponsibility, Synodality, Job Security, and Continuity (or BPDC-OAC-SJC Agenda).

The same academic year 2024-2025 saw the approval of the new courses by CHED: A.B. Political Science and Bachelor of Science in Nursing. The first medical course of the school was given its home in the new building which rose from the ruins of the carpentry shop beside the Cathedral. The ground floor served as the dormition chapel and columbarium of the Diocese of Maasin. The second floor until the fourth floor housed the nursing laboratories, classrooms, and the new and modern SJC Library. To date the school’s physical plant and facilities have greatly improved.

Additional structures such as the Bp. Ataviado Hall, Bp. Hacbang Gym, Bp. Cantillas Gym, Msgr. Mandia Gym, the new four-storey Junior High building, the new three-storey Senior High building, the four-storey Nursing building, the five-storey College building replacing old wooden Benedictine Sisters’ Convent, and the ladies dormitories continued to rise at the main Tunga-tunga campus.

Also, SJC Mambajao Campus saw the following: an old Engineering building got refurbished to welcome Architecture students; the VOCTRAC got expanded with second floors to house various vocational/TESDA short courses; and the hostels once built for the Guinsaugon orphans got renovated and converted to male student-dormitories.

Furthermore, modern facilities to enrich development-oriented courses in arts, education, sciences and business have been installed. To name a few, SJC has fully equipped and air-conditioned computer and speech laboratories and fully furnished audio-visual room. It is equipped with basic science laboratories in Physics, Chemistry and Biology and a simple but workable laboratory for civil engineering and architectural experiments.

Thus, Saint Joseph College has gone a long way from what it was when it was founded in 1928. Its growth has been largely due to the coordinated efforts and dedication of the administration, faculty, studentry, non-academic personnel, alumni, the community and its generous benefactors from other countries and within the country.

The first two heads of the Institution were called Director/Directress. Mgr. Sofio Mandia was the first head and followed by Sr. Godfrieda Baumeister, OSB. It was only in 1972 that the head was formally called School President. Mr. Marcelino Hanopool was considered as the 1st School President. His term lasted until 1978. Bishop Vicente T. Ataviado, Chairman of the Board, assumed the presidency, and thus became the 2nd School President from 1978 until 1995. After 1 years, Bishop Ataviado retired and appointed the 3rd School President, Sr. Anthony Kuizon, OSF. In 1999, Bishop Cantillas, the new Chairman of the Board, upon his installation as the Bishop of Maasin the year before, took the responsibility in leading the institution as the 4th School President.

## Enrollment Process
📋 Enrollment Process for Saint Joseph College:

Step 1: Prepare Requirements
- Form 138 (Report Card)
- Certificate of Good Moral Character
- Birth Certificate (NSO Copy)
- 2x2 ID Photos (4 pieces)

Step 2: Visit Registrar Office
- Submit requirements for evaluation
- Get enrollment form and class schedule
- Pay enrollment fees at the cashier

Step 3: Complete Registration
- Submit completed enrollment form
- Get your class schedule and student ID

Office Hours: Monday-Friday, 8:00 AM - 5:00 PM
Contact: (053) 570-8236

## Grades Information
📊 How to Check Your Grades:

Online Portal:
- Visit the student portal at sjc-portal.edu.ph
- Login with your student ID and password
- Go to "Academic Records" section

Physical Copy:
- Visit the Registrar Office
- Request for grade slip or transcript
- Present valid ID
- Pay required fees (if applicable)

Grade Release Schedule:
- Midterm grades: 2 weeks after exam period
- Final grades: 3 weeks after final exams

For grade inquiries or corrections, please visit our office during business hours.

## Transcript Requests
📄 Transcript Request Process:

Requirements:
- Accomplished request form
- Valid government ID
- Payment receipt

Processing Time:
- Regular processing: 5-7 working days
- Rush processing: 2-3 working days (additional fee)

Fees:
- Official Transcript: ₱150 per copy
- Certified True Copy: ₱100 per copy
- Rush fee: ₱200 additional

How to Request:
1. Fill out transcript request form
2. Pay at the cashier
3. Submit form and receipt to Registrar
4. Get claim stub with release date

Office Location: Ground Floor, Administration Building

## Graduation Requirements
🎓 Graduation Requirements:

Academic Requirements:
- Complete all required subjects in your program
- Maintain required GPA (varies by program)
- No failing grades in major subjects
- Complete OJT/Practicum (if required)

Clearance Process:
- Library clearance
- Laboratory clearance
- Accounting/Finance clearance
- Student Affairs clearance
- Registrar clearance

Documents Needed:
- Application for graduation
- Updated transcript of records
- Clearance form (completed)
- Payment of graduation fees

Timeline:
- Submit application: 1 semester before graduation
- Final clearance: 1 month before graduation

Graduation fee includes diploma, certificate, and ceremony participation.

## Academic Calendar
📅 Academic Calendar & Important Dates:

Current Semester Schedule:
- Enrollment Period: April 7, 2025
- Classes Begin: July 3, 2025
- Exam Schedule: 
  Pre-Midterm
                 College  (July 28 - August 2, 2025)
                 Senior High School  (July 31 - August 2, 2025)
                 Junior High School  (July 31 - August 2, 2025)
                 Elementary  (July 24-26, 2025)
  Midterm
                 College  (August 26-30, 2025)
                 Senior High School  (August 28-29, 2025)
                 Junior High School  (August 28-30, 2025)
                 Elementary  (August 19-22, 2025)
  Pre-Finals
                 College  (September 29-30, 2025)
                 Senior High School  (September 27-28, 2025)
                 Junior High School  (September 28-30, 2025)
                 Elementary  (September 19-22, 2025)
  Final Exams
                 College  (October 27-31, 2025)
                 Senior High School  (October 25-26, 2025)
                 Junior High School  (October 25-27, 2025)
                 Elementary  (October 20-22, 2025)

Next Semester:
- Regular Enrollment: November 3-15, 2025
- Classes Begin: November 17, 2025

Office Hours:
- Monday to Friday: 8:00 AM - 5:00 PM
- Lunch Break: 12:30 PM - 1:30 PM
- Closed on weekends and holidays

Special Schedules:
- Make-up classes: As announced
- Holiday breaks: As per academic calendar

## Computer Science Prerequisites
💻 Computer Science Prerequisites:

First Year Requirements:
- Mathematics in the Modern World
- Understanding the Self
- Readings in Philippine History

Programming Track:
- Introduction to Computing ➜ Computer Programming 1
- Computer Programming 1 ➜ Computer Programming 2
- Data Structures and Algorithms ➜ Advanced Programming

Mathematics Track:
- College Algebra ➜ Trigonometry
- Trigonometry ➜ Calculus 1
- Calculus 1 ➜ Calculus 2

Major Subjects:
- Database Systems (requires Programming 2)
- Software Engineering (requires Data Structures)
- Computer Networks (requires Operating Systems)

Important: You cannot enroll in a subject without completing its prerequisite!

## Contact Information
📞 Contact Information:

Registrar Office
- Location: Main Campus, Tunga-tunga, Maasin City, Southern Leyte
- Phone: (053) 570-2303 / Local 104
- Email: registrar@sjc.edu.ph

Office Hours:
- Monday to Friday: 8:00 AM - 5:00 PM
- Lunch Break: 12:00 PM - 1:00 PM
- Closed: Weekends and holidays

Staff Directory:
- Ms. Maria Santos - Registrar
- Mr. Juan Dela Cruz - Assistant Registrar
- Ms. Ana Garcia - Records Officer

For Urgent Matters:
- Emergency contact: (053) 570-8200
- Student Affairs: (053) 570-8245

## Office of the Registrar Overview
The Office of the Registrar at Saint Joseph College, Maasin City serves as the central hub for academic records and student registration services. With a commitment to integrity, efficiency, and student-centered service, the office plays a vital role in managing student information from enrollment to graduation.

## Core Services
The Registrar's Office provides the following key services:

1. Enrollment Processing (Pre-registration and Registration)
2. Issuance of Academic Records (Transcript of Records, Diplomas, Certifications)
3. Student Record Management
4. Evaluation for Graduation
5. Processing of Transfer Credentials
6. Implementation of Academic Policies and Regulations
7. Student ID Processing and Validation
8. TESDA Certification Coordination for NC II and III Courses

## Important Functions
- Handles class scheduling and sectioning in coordination with department deans
- Facilitates clearance processing and graduation document release
- Maintains the confidentiality and security of student academic records
- Coordinates with CHED and TESDA for academic compliance and documentation

## Student Reminders
- Request for documents (TOR, CTC, diplomas) must be filed at least 5 working days in advance
- Bring a valid ID and official receipt when claiming any documents
- Online request forms may be available during peak enrollment and graduation seasons

## Fees and Payments
💰 Fees and Payments:

Common Document Fees:
- Official Transcript: ₱150 per copy
- Certified True Copy: ₱100 per copy
- Certificate of Enrollment: ₱50
- Certificate of Grades: ₱75
- Good Moral Certificate: ₱50

Processing Fees:
- Regular processing: Included
- Rush processing: +₱200
- Special delivery: +₱100

Payment Methods:
- Cash payment at Cashier's Office
- Bank deposit (for alumni)
- Online payment (coming soon)

Payment Hours:
- Monday to Friday: 8:00 AM - 4:30 PM
- Lunch Break: 12:00 PM - 1:00 PM

Important: Keep your official receipt for document claiming!

For tuition and other fees, please contact the Accounting Office.
`;

// This is the system prompt that will guide the AI's behavior
const systemPrompt = `
You are SARA (Student Academic Registration Assistant), a helpful AI assistant for Saint Joseph College in Maasin City, Southern Leyte. 
Your purpose is to assist students with inquiries related to enrollment, registration, academic requirements, and other student services.

IMPORTANT GUIDELINES:
1. Be friendly, helpful, and respectful in your responses.
2. Use emojis VERY sparingly - only at the beginning or end of messages, never in the main content.
3. Format your responses with clear sections, bullet points, and newlines for readability.
4. Keep your answers focused on academic matters relevant to Saint Joseph College.
5. When you don't have specific information, direct students to the appropriate office.
6. Always provide the Registrar Office contact information: (053) 570-2303 / Local 104 for complex inquiries.
7. Sign off with an encouraging message, but avoid using emojis in every response.
8. Your personality is: helpful, knowledgeable, professional, and friendly.
9. IMPORTANT: Keep your responses clean and professional with minimal emojis.

Use ONLY the provided knowledge base to answer questions. Do not make up information not included in the knowledge base.
`;

/**
 * Generate a response using Gemini
 */
export async function generateGeminiResponse(
  messages: Array<{ role: string; content: string }>
) {
  try {
    // Get the most recent user message
    const lastMessage = messages[messages.length - 1]?.content || "";
    
    // Build conversation history for context
    let conversationContext = "";
    if (messages.length > 1) {
      conversationContext = messages.slice(0, -1).map(msg => 
        `${msg.role === "user" ? "Student" : "SARA"}: ${msg.content}`
      ).join("\n\n");
    }

    // Create the prompt with system instructions, knowledge base, conversation history, and current question
    const prompt = `${systemPrompt}

KNOWLEDGE BASE:
${knowledgeBase}

${conversationContext ? `CONVERSATION HISTORY:\n${conversationContext}\n\n` : ""}

CURRENT STUDENT QUESTION: ${lastMessage}

Please respond as SARA, using the knowledge base above to provide accurate information about Saint Joseph College. Be helpful, friendly, and maintain the conversational context.`;

    // Generate response using the API structure
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
    });

    // Post-process the response
    let cleanedResponse = response.text ?? "";
    // Remove asterisks (*) from the response to avoid markdown formatting
    cleanedResponse = cleanedResponse.replace(/\*/g, '');
    // Limit emojis in the main content (keep only at beginning/end)
    // First, split the response into lines
    const lines = cleanedResponse.split('\n');
    // Keep emojis in the first and last line, remove from middle content
    if (lines.length > 2) {
      const firstLine = lines[0];
      const lastLine = lines[lines.length - 1];
      // Process middle lines to reduce emojis
      const middleLines = lines.slice(1, lines.length - 1).map(line => {
        // Replace common emojis with their text equivalents or remove them
        return line.replace(/[😊😀😃😄😁🙂👋👍🎓📚📝📋📅📄📞💰📊]/g, '');
      });
      // Reassemble the response
      cleanedResponse = [firstLine, ...middleLines, lastLine].join('\n');
    }
    return cleanedResponse;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Sorry, I encountered an error. Please try again or contact the registrar office directly at (053) 570-2303 / Local 104.";
  }
}