Feature: User login on Santa website
    Scenario: User logs in sucessfuly

        Given user is on santa login page
        When user logs in as "marinagubina37+1@gmail.com" and "test12345"
        #When user logs in with table 
        #    | login | password|
        #   | marinagubina37+1@gmail.com | test12345 |
        #When user logs in as "<login>" and "<password>"
        Then user is on dashboard page
        #Examples:
            | login | password | 
            | marinagubina37+1@gmail.com  | test12345  | 
            | marinagubina37+2@gmail.com  | BD7604  | 
            | marinagubina37+3@gmail.com  | test12345  | 
        
        Then user enter name of box
        Then get boxname
        Then user choose icon
