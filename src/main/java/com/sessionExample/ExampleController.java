package com.sessionExample;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class ExampleController {

	private @Autowired HttpServletResponse response;
	private @Autowired HttpServletRequest request;
	private @Autowired HttpSession session;
	
	public HttpServletResponse getResponse() {
		return response;
	}
	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}
	public HttpServletRequest getRequest() {
		return request;
	}
	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}
	@RequestMapping("/")
	 public ModelAndView showSessionId() {
	        ModelAndView mav = new ModelAndView("index.html");
	        return mav; 
	    }
	@GetMapping(produces = "text/plain", value = "/login")
	public String loginAction(){
		String mav = "Login";
		String userName = request.getParameter("userName");
		String password = request.getParameter("password");
		if(userName.equalsIgnoreCase(userName)&&password.equalsIgnoreCase("Msb12345")){
			System.out.println("in login if");
			 session = request.getSession(true);
		     session.setAttribute("name", userName);
			mav = "Success";
		}
		else{
			mav = "Invalid Credientials";
			System.out.println("in login else");
		}
		return mav;
	}
	
	@GetMapping(produces = "text/plain", value = "/getDetails")
	public String getUserDetails(){
		String resultMsg = "null" ;
		try{
		 if(request.getSession(false)!=null){
			resultMsg = "UserName u entered:"+ getRequest().getSession(false).getAttribute("name").toString();
		 }
		 System.out.println(resultMsg);
		}catch(Exception e){
			e.printStackTrace();
		}
		 return resultMsg;
	}
}
