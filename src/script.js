    var choiceCodes= []; //It stores the choices of the user
    var jobsFinalArray=[],jobsScoreFinalArray=[];
    var jobs={ //It stores the jobs list alongwith their required skills
    "Software Developer":["code","solve","analyse","creative","patience","learning","perfection","communicationSkills"],
    "Database Administrator":["code","solve","analyse","criticalThinking","management","hardware","patience","learning"],
    "Computer Hardware Engineer":["code","design","solve","analyse","creative","criticalThinking","hardware","patience","learning","perfection"],
    "Computer Systems Analyst":["code","analyse","creative","criticalThinking","studying","management","allrounder","hardware","patience","learning","communicationSkills","businessSkills"],
    "Computer Network Architect":["code","design","solve","analyse","hardware","patience","learning"],
    "Fullstack Web Developer":["code","design","solve","analyse","creative","socialMedia","patience","learning","communicationSkills"],
    "Front-end Web Developer":["code","design","solve","analyse","creative","socialMedia","patience","learning","communicationSkills"],
    "Back-end Web Developer":["code","solve","analyse","patience","learning","communicationSkills"],
    "Mobile Application Developer":["code","design","solve","analyse","creative","patience","learning"],
    "Machine Learning Engineer":["code","solve","analyse","creative","patience","learning","perfection","communicationSkills"],
    "Data Engineer":["code","solve","analyse","creative","patience","learning","perfection","communicationSkills"],
    "Information Security Analyst":["code","solve","analyse","criticalThinking","patience","learning","perfection","communicationSkills"],
    "Computer and Information Systems Manager":["code","design","analyse","creative","criticalThinking","leadership","management","allrounder","hardware","patience","learning","communicationSkills","businessSkills"],
    "Project Manager":["solve","analyse","creative","criticalThinking","leadership","management","allrounder","patience","perfection","communicationSkills","businessSkills"],
    "Game Developer":["code","design","solve","analyse","creative","game","patience","learning"],
    "UI/UX Developer":["design","solve","analyse","creative","management","allrounder","patience","perfection","communicationSkills","businessSkills"]
    };

    var jobDetails={
    "Software Developer":["Software developers are the creative minds behind computer programs","https://collegegrad.com/careers/software-developers"],
    "Database Administrator":["Database administrators use specialized software to store and organize data","https://collegegrad.com/careers/database-administrators"],
    "Computer Hardware Engineer":["Computer hardware engineers research, design, develop, and test computer systems and components","https://collegegrad.com/careers/computer-hardware-engineers"],
    "Computer Systems Analyst":["Computer systems analysts study an organization's current computer systems and procedures, and design solutions","https://collegegrad.com/careers/computer-systems-analysts"],
    "Computer Network Architect":["Computer network architects design and build data communication networks, including LANs, WANs and Intranets","https://collegegrad.com/careers/computer-network-architects"],
    "Fullstack Web Developer":["Full-Stack Web Developer works on both the front-end and back-end portions of an application","https://www.sitepoint.com/full-stack-developer/"],
    "Front-end Web Developer":["Front-end Web Developer works on the core elements of front-end of a web application","https://www.roberthalf.com/blog/salaries-and-skills/hot-job-front-end-web-developer"],
    "Back-end Web Developer":["Back-end Web Developers are responsible for building out the server side in web applications","https://www.thebalancecareers.com/the-skills-you-need-to-be-a-backend-developer-2071184"],
    "Mobile Application Developer":["Mobile Application Developer develop mobile applications for various Mobile OS","https://www.simplilearn.com/building-career-in-mobile-app-development-article"],
    "Machine Learning Engineer":["Machine Learning Engineer's focus goes beyond specifically programming machines to perform specific tasks using AI","https://blog.udacity.com/2016/04/5-skills-you-need-to-become-a-machine-learning-engineer.html"],
    "Data Engineer":["Data Engineer develop, construct, test and maintain architectures such as databases and large-scale data processing systems","http://www.mastersindatascience.org/careers/data-engineer/"],
    "Information Security Analyst":["Information security analysts plan and carry out security measures to protect an organization's computer networks and systems","https://collegegrad.com/careers/information-security-analysts"],
    "Computer and Information Systems Manager":["Computer and Information Systems Manager coordinates and directs an organization's computer-related activities","https://www.thebalancecareers.com/computer-and-information-systems-manager-525998"],
    "Project Manager":["Project Managers supervise all aspects of a project, coordinating the workforce to ensure work flows smoothly from start to finish","http://www.project-skills.com/whats-the-career-path-of-a-project-manager/"],
    "Game Developer":[" Game Developers turn the vision of the game artists and designers into reality by utilizing programming and coding languages.","https://www.academicinvest.com/engineering-careers/software-engineering-careers/how-to-become-a-video-game-developer"],
    "UI/UX Developer":["UX/UI Developers work on creating beautiful interfaces and usually work on Front-end of an application","https://trydesignlab.com/blog/ux-or-ui-which-career-is-best-for-you/"]
    };

    //This function changes the color of the choices upon clickng from white to green and stores them in an array called choiceCodes
    function changeColor(buttonName)
    {
        //document.getElementsByClassName("square-service-block").style.backgroundColor="#FFFFFF";
        document.getElementById(buttonName).style.backgroundColor="#a442f4";
        choiceCodes.push(buttonName);
    }

    //This function clears all the choices, turns their color from green to white and also clears the localStorage of any choice f stored
    function clearPreferences()
    {
        var links=document.getElementsByClassName("big-buttons");
        for(var i=0;i<links.length;i++)
        {
            links[i].style.backgroundColor="#1c60ff";
        }
        /*
        document.getElementById('code').style.backgroundColor="white";*/
        choiceCodes= [];
        localStorage.removeItem('consoleCodes');
    }

    //This function submits the choices which saves the choices to the localStorage and upon completion it takes them to the next page showing the results
    function submit()
    {
        if(choiceCodes.length>0)
        {
            localStorage.setItem('consoleCodes',JSON.stringify(choiceCodes));
            if(localStorage.hasOwnProperty('consoleCodes'))
            {
                alert("Your choices were successfully saved!");
                window.open("careers.html","_self")
            }
            else
            {
                alert("Unsuccessful in storing your choices. Please refresh the page and try again");
            }
        }
        else
        {
            alert("Kindly select your choices");
        }
    }

    //This function updates the results page with the jobs according to the preferences submitted by the user in the previous page
    function updateJobs()
    {
        if(localStorage.hasOwnProperty('consoleCodes'))
        {
            choiceCodes=JSON.parse(localStorage.getItem('consoleCodes'));
            //console.log("completed uJ");
            findTheBestJob();

        }
        else
        {
            alert("You haven't entered your preference tags, kindly choose your tags");
            window.open("index.html","_self")
        }
    }

    //This function finds the best job according to the choices made by the user and finally stores the jobs according to the best match in descendind order in the array jobsFinalArray
    function findTheBestJob()
    {
        //console.log(jobs);
        //console.log("80");
        var jobMatchScore=0;
        var jobMax="";


        //This for loop iterates over all the jobs in the jobs array
        for(var job in jobs)
        {
            //This for loop iterates over all the selected codes of the user
            for(var selectCodeIndex=0; selectCodeIndex<choiceCodes.length; selectCodeIndex++)
            {
                var selectCode=choiceCodes[selectCodeIndex];
                //This for loop iterates over the codes of each job
                for(var jobCodeIndex=0; jobCodeIndex<jobs[job].length;jobCodeIndex++)
                {
                    var jobCode=jobs[job][jobCodeIndex];
                    //This if condition compares the job's code with the user's chosen code and counts the number of similarities and stores them in jobMatchScore
                    if(jobCode==selectCode)
                    {
                        jobMatchScore++;
                        break;
                    }
                }
                //console.log("98");
            }
            //console.log("100");
            //console.log(job);
            //console.log(jobMatchScore);

            //These two lines create two new arrays containing the jobs alongwith their respective match scores
            jobsFinalArray.push(job);
            jobsScoreFinalArray.push(jobMatchScore);
            jobMatchScore=0;

            //console.log("106");
            //console.log(jobsFinalArray);
            //console.log(jobsScoreFinalArray);
        }
        //console.log("108");
        //console.log(jobsFinalArray);
        //console.log("----------------------");
        //console.log(jobsScoreFinalArray);


        //These two for loops are used for Selection Sort of the two arrays
        for(var i=0;i<jobsScoreFinalArray.length;i++)
        {
            var max=i;
            for(var j=i+1;j<jobsScoreFinalArray.length;j++)
            {
                if(jobsScoreFinalArray[j]>jobsScoreFinalArray[max])
                {
                    max=j;
                }
            }
            //console.log(jobsScoreFinalArray[i]);
            var tempScore=jobsScoreFinalArray[i];
            jobsScoreFinalArray[i]=jobsScoreFinalArray[max];
            jobsScoreFinalArray[max]=tempScore;

            //console.log(jobsFinalArray[i]);
            var tempJob=jobsFinalArray[i];
            jobsFinalArray[i]=jobsFinalArray[max];
            jobsFinalArray[max]=tempJob;
        }
        //console.log(jobsFinalArray);
        //console.log(jobsScoreFinalArray);

        //These two lines are used to pick out the top 5 jobs in descending order
        jobsFinalArray=jobsFinalArray.slice(0,5);
        jobsScoreFinalArray=jobsScoreFinalArray.slice(0,5);
        //console.log(jobsFinalArray);

        cardUpdater();
    }
    //This function displays the top 5 jobs in the Careers Page in Bootstrap Cards
    function cardUpdater()
    {
        var jobTitleIds=["JOB-1-title","JOB-2-title","JOB-3-title","JOB-4-title","JOB-5-title"];
        var jobDetailsIds=["JOB-1-details","JOB-2-details","JOB-3-details","JOB-4-details","JOB-5-details"];
        var jobLinkIds=["JOB-1-link","JOB-2-link","JOB-3-link","JOB-4-link","JOB-5-link"];

        for(var i=0;i<jobsFinalArray.length;i++)
        {
            var currentJob=jobsFinalArray[i];
            document.getElementById(jobTitleIds[i]).innerHTML=currentJob;
            for(var job in jobDetails)
            {
                if(job==currentJob)
                {
                    document.getElementById(jobDetailsIds[i]).innerHTML=jobDetails[job][0];
                    document.getElementById(jobLinkIds[i]).setAttribute('href', jobDetails[job][1]);
                }
            }
        }
    }