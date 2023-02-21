from otree.api import *
import numpy as np
import pandas as pd
import re 
import random
import os
import time


c = Currency

doc = """
ᶘ ᵒᴥᵒᶅ i see memes
"""

class Constants(BaseConstants):
    name_in_url = 'em'
    players_per_group = None
    num_rounds = 1
  
class Subsession(BaseSubsession):
    pass

class Group(BaseGroup):
    pass

class Player(BasePlayer):
    iEmotionalStatus        = models.IntegerField()      
    dRTEmotionalStatus      = models.FloatField(blank=True)

     
###################################################################################################
#  Pages ᕕ(ᐛ)ᕗ
###################################################################################################

class HowDoYaFeel(Page):
    form_model = 'player' 
    form_fields = [
        'iEmotionalStatus','dRTEmotionalStatus',
    ]

    @staticmethod
    def js_vars(player: Player):
        session = player.session
        p = player.participant
        return {
            'bRequireFS'        : session.config['bRequireFS'],
            'bCheckFocus'       : session.config['bCheckFocus'],
            'dPixelRatio'       : p.dPixelRatio,
        }

page_sequence = [HowDoYaFeel]
