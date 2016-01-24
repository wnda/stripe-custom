  function stripeResponseHandler(status,response){
      "use strict";
      var paymentForm=document.forms['payform'];
      if(response.error){
        document.getElementById('feedback').textContent=response.error.message;
        document.getElementById('btnpay').removeAttribute('disabled');
      }else{
        var dataAmount=document.getElementById('amount');
        var dataEmail=document.getElementById('email');
        var stripeToken=response.id;
        var formString="amount="+dataAmount.value+"&stripeToken="+stripeToken+"&email="+dataEmail.value;
        
        function submitForm(f){
          var xhr=new XMLHttpRequest();
          xhr.onload=function(){window.location=xhr.responseText;}
          xhr.onerror=function(){document.getElementById('feedback').textContent="Sorry, there was a technical error. Please try again later.";console.log(xhr.responseText);}
          xhr.open(paymentForm.method,paymentForm.action,true);
          xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
          xhr.send(f);
          return false;
        }
        
        return submitForm(formString);
      }
    }
  !function(){
    "use strict";
    var paymentForm=document.forms['payform'];
    paymentForm.addEventListener('submit',function(e){
      e.preventDefault();
      var thisForm=this;
      document.getElementById('btnpay').setAttribute('disabled',true);
      var baseAmount=document.getElementById('amountbase').value | 0;
      var amountField=document.getElementById('amount');
      function pound(a){return a * 100;};
      amountField.value=pound(baseAmount);
      if(amountField.value>0){
      Stripe.card.createToken(thisForm,stripeResponseHandler);
      }else{alert('Please enter a payment amount');document.getElementById('btnpay').removeAttribute('disabled');}
    });
  }();
