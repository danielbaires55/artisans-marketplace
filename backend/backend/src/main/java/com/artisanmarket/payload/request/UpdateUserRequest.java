package com.artisanmarket.payload.request;

import javax.validation.constraints.Size;

public class UpdateUserRequest {
  @Size(max = 255)
  private String firstName;

  @Size(max = 255)
  private String lastName;

  @Size(max = 255)
  private String address;

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