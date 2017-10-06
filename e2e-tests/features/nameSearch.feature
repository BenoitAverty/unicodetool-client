Feature: Named search

    Scenario: Searching for a character with 1 match
        Given I am on the Home Page
        When I type "PLAYING CARD QUEEN OF HEARTS" in the search field
        Then There is 1 search result
        Then The codepoint "U+1F0BD PLAYING CARD QUEEN OF HEARTS" (🂽) is present in the results

    Scenario: Searching for a character with several matches
        Given I am on the Home Page
        When I type "GHOST" in the search field
        Then There are 3 search results
        And The codepoint "U+1F47B GHOST" (👻) is present in the results
        And The codepoint "U+2FC1 KANGXI RADICAL GHOST" (⿁) is present in the results
        And The codepoint "U+2EE4 CJK RADICAL GHOST" (⻤) is present in the results
        