package com.artisanmarket.payload.request;

import javax.validation.constraints.*;

public class SignupRequest {
  @NotBlank
  @Size(max = 255)
  @Email
  private String email;

  @NotBlank
  @Size(min = 6, max = 255)
  private String password;

  @NotBlank
  @Size(max = 255)
  private String firstName;

  @NotBlank
  @Size(max = 255)
  private String lastName;

  @Size(max = 255)
  private String address;

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }
}