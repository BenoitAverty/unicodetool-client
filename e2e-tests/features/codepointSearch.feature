Feature: Codepoint search

    Scenario: Searching for a non-existant codepoint
        Given I am on the Home Page
        When I type "U+123456" in the search field
        Then There are 0 search results

    Scenario: Searching for a codepoint
        Given I am on the Home Page
        When I type "U+1F47B" in the search field
        Then There is 1 search result
        And The codepoint "U+1F47B GHOST" (👻) is present in the results
