from otree.api import *

c = Currency

doc = """
Your app description
"""


class Constants(BaseConstants):
    name_in_url = 'Questionnaire'
    players_per_group = None
    num_rounds = 1
class Subsession(BaseSubsession):
    pass

class Group(BaseGroup):
    pass

class Player(BasePlayer):
    # Variables for Demographics
    D1 = models.StringField()
    D2 = models.StringField()
    D3 = models.StringField()
    D4 = models.StringField()
    D5 = models.StringField()
    D6 = models.StringField(blank=True)
    D7 = models.StringField(blank=True)
    D8 = models.StringField()
    D9 = models.StringField()
    D10 = models.StringField()          #like this right now because I do not know how to do shortOpen questions properly
    D11 = models.StringField()
    D12 = models.StringField()
    D13 = models.StringField()
    D14 = models.StringField()
    D15 = models.StringField()


    # Variables for IAS scale
    IAS1 = models.StringField()
    IAS2 = models.StringField()
    IAS3 = models.StringField()
 
    # Variables for CIUS questionnaire
    CIUS1 = models.StringField()
    CIUS2 = models.StringField()
    CIUS3 = models.StringField()
    CIUS4 = models.StringField()
    CIUS5 = models.StringField()
    CIUS6 = models.StringField()
    CIUS7 = models.StringField()
    CIUS8 = models.StringField()
    CIUS9 = models.StringField()
    CIUS10 = models.StringField()
    CIUS11 = models.StringField()
    CIUS12 = models.StringField()
    CIUS13 = models.StringField()

    # Validation Questions
    V1 = models.StringField()
    V2 = models.StringField()
    V3 = models.StringField()


# PAGES
class Questionnaire(Page):
    form_model = 'player'
    form_fields = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14', 'D15',
    'CIUS1', 'CIUS2', 'CIUS3', 'CIUS4', 'CIUS5', 'CIUS6', 'CIUS7', 'CIUS8', 'CIUS9', 'CIUS10', 'CIUS11', 'CIUS12', 'CIUS13',
    'IAS1', 'IAS2', 'IAS3',
    'V1', 'V2', 'V3',
    ]


    @staticmethod
    def before_next_page(player, timeout_happened):
        # Validate questionnaire
        valid1 = int(int(player.V1)==2)
        valid2 = int(int(player.V2)==4)
        valid3 = int(int(player.V3)==1)
        player.participant.validQuestionnaire = valid1 + valid2 + valid3


page_sequence = [Questionnaire]
