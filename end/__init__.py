from otree.api import *
from numpy import random
import numpy as np
import time


doc = """
its the eeeeend my only friend, theeee eeeeeeend
"""


class Constants(BaseConstants):
    name_in_url = 'EndPage'
    players_per_group = None
    num_rounds = 1
  
    ProlificLink = "https://app.prolific.co/submissions/complete?cc=3A1CB5ED"
    Slides = [
        dict(
            Title = 'This is the end',
            path='EndPage/slide1.html',
            ),        
    ]

class Subsession(BaseSubsession):
    pass

class Group(BaseGroup):
    pass

class Player(BasePlayer):
    partID              = models.StringField()
    ProlificID          = models.StringField()
    TotalTime           = models.FloatField()
    dTimeOutFocus       = models.FloatField()
    iOutFocus           = models.IntegerField()
    iFSChanges          = models.IntegerField()

# PAGES
class FinalPage(Page):

    @staticmethod
    def before_next_page(player, timeout_happened):
        # Define Participant and other Vars
        p       = player.participant
        start   = p.startTime
        end     = time.time()
        # Save relevant variables
        player.partID           = p.code
        player.ProlificID       = p.label
        player.TotalTime        = end - start
        player.iFSChanges       = p.iFullscreenChanges
        player.iOutFocus        = p.iOutFocus
        player.dTimeOutFocus    = p.dTimeOutFocus

page_sequence = [FinalPage]



