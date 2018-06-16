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

    //This function changes the color of the choices upon clickng from white to green and stores them in an array called choiceCodes
    function changeColor(buttonName)
    {
        //document.getElementsByClassName("square-service-block").style.backgroundColor="#FFFFFF";
        document.getElementById(buttonName).style.backgroundColor="green";
        choiceCodes.push(buttonName);
    }

    //This function clears all the choices, turns their color from green to white and also clears the localStorage of any choice f stored
    function clearPreferences()
    {
        var links=document.getElementsByClassName("big-buttons");
        for(var i=0;i<links.length;i++)
        {
            links[i].style.backgroundColor="#808080";
        }
        /*
        document.getElementById('code').style.backgroundColor="white";
        document.getElementById('design').style.backgroundColor="white";
        document.getElementById('solve').style.backgroundColor="white";
        document.getElementById('analyse').style.backgroundColor="white";
        document.getElementById('creative').style.backgroundColor="white";
        document.getElementById('criticalThinking').style.backgroundColor="white";
        document.getElementById('studying').style.backgroundColor="white";
        document.getElementById('leadership').style.backgroundColor="white";
        document.getElementById('management').style.backgroundColor="white";
        document.getElementById('allrounder').style.backgroundColor="white";
        document.getElementById('research').style.backgroundColor="white";
        document.getElementById('game').style.backgroundColor="white";
        document.getElementById('teaching').style.backgroundColor="white";
        document.getElementById('socialMedia').style.backgroundColor="white";
        document.getElementById('hardware').style.backgroundColor="white";
        document.getElementById('patience').style.backgroundColor="white";
        document.getElementById('learning').style.backgroundColor="white";
        document.getElementById('perfection').style.backgroundColor="white";
        document.getElementById('communicationSkills').style.backgroundColor="white";
        document.getElementById('businessSkills').style.backgroundColor="white";*/
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
        document.getElementById("JOB-1").innerHTML=jobsFinalArray[0];
        document.getElementById("JOB-2").innerHTML=jobsFinalArray[1];
        document.getElementById("JOB-3").innerHTML=jobsFinalArray[2];
        document.getElementById("JOB-4").innerHTML=jobsFinalArray[3];
        document.getElementById("JOB-5").innerHTML=jobsFinalArray[4];
    }