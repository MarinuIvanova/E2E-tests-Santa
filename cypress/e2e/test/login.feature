Feature: User login on Santa website
    Scenario: User logs in sucessfuly

        Given user is on santa login page
        When user logs in
        Then user is on dashboard page