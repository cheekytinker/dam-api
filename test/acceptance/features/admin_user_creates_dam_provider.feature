Feature: admin user creates dam provider
  As an admin user
  I want to create a Dam Provider
  So that I can configure how assets from an external Dam should be synchronized into my system

  Scenario: Successfully create Dam Provider
    Given an Dam Provider named '<autogenerate>'
    And the Dam Provider type is 'StarLabs'
    When a request is made to create a Dam Provider
    Then we expect the response to be 201 'Dam Provider "<damProviderName>" created'
