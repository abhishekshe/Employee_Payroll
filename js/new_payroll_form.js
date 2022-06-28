window.addEventListener('DOMContentLoaded',(event)=>{
    const name= document.querySelector('#name');
    const textError= document.querySelector('.name-error');
    name.addEventListener('input',function(){
        if(name.value.length==0)
        {
            textError.textContent="";
            return;
        }
        try{
            (new EmployeePayrollData()).name=name.value;
            textError.textContent="";
        }
        catch(e)
        {
            textError.textContent=e;
        }
    });
    const salary= document.querySelector('#salary');
    const output= document.querySelector('.salary-output');
    output.textContent=salary.value;
    salary.addEventListener('input',function(){
    output.textContent=salary.value;
    });

    dateError= document.querySelector(".date-error");
    var year= document.querySelector('#year');
    var month= document.querySelector('#month');
    var day=document.querySelector('#day');

    year.addEventListener('input',checkDate);
    month.addEventListener('input',checkDate);
    day.addEventListener('input',checkDate)

    function checkDate(){ 
    try
    {
        let dates= getInputValueById("#day")+" "+getInputValueById("#month")+" "+getInputValueById("#year");
        dates=new Date(Date.parse(dates));
        (new EmployeePayrollData()).startDate=dates;
        dateError.textContent="";
    }
    catch(e)
    {
        dateError.textContent=e;
    }

}

});

const save=()=>{
    try
    {
        let employeePayrollData= createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }
    catch(e)
    {
        return;
    }
}
function createAndUpdateStorage(employeePayrollData){
    
    
    let employeePayrollList= JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList!=undefined)
    {
        employeePayrollList.push(employeePayrollData);
    }
    else
    {
        employeePayrollList=[employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const createEmployeePayroll=()=>{
    let employeePayrollData= new EmployeePayrollData();
    try
    {
        employeePayrollData.name= getInputValueById('#name');
    }
    catch(e)
    {
        setTextValue('.name-error',e)
    }
    employeePayrollData.profilePic= getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender= getSelectedValues('[name=gender]').pop();
    employeePayrollData.department=getSelectedValues('[name=department]');
    employeePayrollData.salary= getInputValueById('#salary');
    employeePayrollData.note=getInputValueById('#notes');
    let date= getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.startDate= new Date(Date.parse(date));
    alert(employeePayrollData.toString());
    return employeePayrollData;
}
const getSelectedValues=(propertyValue)=>{
    let allItems= document.querySelectorAll(propertyValue);
    let selItems=[];
    allItems.forEach(item=>{
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}
const getInputValueById=(id)=>
{
    let value= document.querySelector(id).value;
    return value;
}
const getInputElementValue=(id)=>{
    let value= document.getElementById(id).value;
    return value;
}

const resetForm=()=>{
    setTextValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setTextValue('#salary','');
    setTextValue('#notes','');
    setTextValue('#day',1);
    setTextValue('#month','January');
    setTextValue('#year','2020');
}
const unsetSelectedValues= (propertyValue)=>{
    let allItems= document.querySelectorAll(propertyValue);
    allItems.forEach(items=>{
        items.checked=false;
    });
}
const setTextValue=(id,value)=>
{
    const element= document.querySelector(id);
    element.textContent=value;
}