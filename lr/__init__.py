from otree.api import *
import numpy as np
import pandas as pd
import re 
import random
import os
import time
import warnings

warnings.filterwarnings('ignore', category=UserWarning, module='openpyxl') # feels wrong lol

c = Currency

doc = """
ᶘ ᵒᴥᵒᶅ i see memes
"""

class Constants(BaseConstants):
    name_in_url = 'exp2'
    players_per_group = None
    num_rounds = 20
    df = pd.read_excel("_static/global/HR.xlsx",index_col="Numbers")
    df2 = pd.read_excel("_static/global/LR.xlsx",index_col="Numbers")
    total_time = 420 #(7 min)  # 1200 (20 min) # 600 (10 minutes)
    IMG_ON_PAGE = 6

class Subsession(BaseSubsession):
    pass

class Group(BaseGroup):
    pass

class Player(BasePlayer):
    ## Treatment Variables 
    sTreatment              = models.StringField(blank=True) 
    sReward                 = models.StringField(blank=True)

    ## Focus Variables
    iFocusLost               = models.IntegerField(blank=True)
    dFocusLostT              = models.FloatField(blank=True)
    iFullscreenChange        = models.IntegerField(blank=True)

    ## Participant input Variables 
    iFeedLikes              = models.IntegerField(blank=True)
    iFeedDislikes           = models.IntegerField(blank=True)
    iPost                   = models.IntegerField(blank=True)       # the meme they choose during posting

    ## Meme information Variables
    iLikes                  = models.IntegerField(blank=True)
    iDislikes               = models.IntegerField(blank=True)
    iImgPost1               = models.IntegerField(blank=True)
    iImgPost2               = models.IntegerField(blank=True)
    iImgPost3               = models.IntegerField(blank=True)
    iImgPost4               = models.IntegerField(blank=True)
    iImgPost5               = models.IntegerField(blank=True)
    iImgPost6               = models.IntegerField(blank=True)

    ## RT variables     
    dRTLatency              = models.FloatField(blank=True)         #d because the type is double
    dRTPost                 = models.FloatField(blank=True) 
    dRTFeedback             = models.FloatField(blank=True)
    dRTLast                 = models.FloatField(blank=True)

###################################################################################################
#  FUNCTION ᕕ(ᐛ)ᕗ
###################################################################################################

def creating_session(subsession):
    players = subsession.get_players()
    for i, player in enumerate(players, start=1):
        p = player.participant
        if player.round_number == 1:
            #between randomization
            p.sTreatment = 'Control'
    
            #IMAGES 
            pattern = r"meme(?P<number>\d{3})\.jpeg"
            LRmemelist = os.listdir('_static/LR')[1:-1] 
            LRnumbers = [int(re.match(pattern, x).group("number")) for x in LRmemelist]  # take all of the numbers from the image files and put them on a list
            LRnumbers = random.sample(LRnumbers, len(LRnumbers))        #shuffle so order is not the same across participants
            LRnumbers = [LRnumbers[n-Constants.IMG_ON_PAGE:n] for n in range(Constants.IMG_ON_PAGE,len(LRnumbers), Constants.IMG_ON_PAGE)]
            p.LRmemematrix = LRnumbers
            HRmemelist = os.listdir('_static/HR')[1:-1] 
            HRnumbers = [int(re.match(pattern, x).group("number")) for x in HRmemelist]  # take all of the numbers from the image files and put them on a list
            HRnumbers = random.sample(HRnumbers, len(HRnumbers))
            HRnumbers = [HRnumbers[n-Constants.IMG_ON_PAGE:n] for n in range(Constants.IMG_ON_PAGE,len(HRnumbers), Constants.IMG_ON_PAGE)]                
            p.HRmemematrix = HRnumbers
        
        player.sTreatment = p.sTreatment

        if player.round_number > 1:
            prev_player = player.in_round(player.round_number - 1)

        # Sanity check to print every 20 players
        if i % 100 == 0:
            print("Creating lr for player", i)

        

###################################################################################################
#  Pages ᕕ(ᐛ)ᕗ
###################################################################################################

class ready(Page):
    @staticmethod
    def before_next_page(player, timeout_happened):
        participant = player.participant
        participant.dExpiry = time.time() + Constants.total_time   # This initializes the time counter
        participant.dExpiry = round(participant.dExpiry)

    @staticmethod
    def is_displayed(player):
        return player.round_number == 1
    
    @staticmethod
    def js_vars(player: Player):
        session = player.session
        p = player.participant
        return {
            'bRequireFS'        : session.config['bRequireFS'],
            'bCheckFocus'       : session.config['bCheckFocus'],
            'dPixelRatio'       : p.dPixelRatio,
        }

class SplitScreen(Page):
    form_model = 'player' 
    form_fields = [
        'iFeedLikes','iFeedDislikes', 
        'dRTLatency', 'dRTLast',
        'iFocusLost','dFocusLostT', 'iFullscreenChange',
    ] 

    @staticmethod
    def get_timeout_seconds(player):
        participant = player.participant
        return participant.dExpiry - time.time()

    @staticmethod
    def vars_for_template(player):    

        participant = player.participant   

        player.sReward = 'LR'

        # url_list=[] #check if this step is even necessary right now
        url_list = [f'memes/feed{meme}.jpeg' for meme in range(1,410)]  #all memes now
        random.shuffle(url_list) #so feed changes everytime

        if player.round_number == 1:
           return dict(url_list=url_list)
        else: 
            prev_player = player.in_round(player.round_number - 1)
            return {
                    'prev_player'   :  player.in_round(player.round_number - 1), #define the last round
                    'image_path'    :  "".join([prev_player.sReward,'/meme', str(prev_player.iPost) , '.jpeg']) ,
                    'dislikes'      :  prev_player.iDislikes ,
                    'likes'         :  prev_player.iLikes ,
                    'roundnumber'   :  prev_player.round_number ,
                    'url_list'      :  url_list , 
            }

    @staticmethod
    def is_displayed(player):
        p = player.participant
        time_left = p.dExpiry - time.time()
        return time_left > 3

    @staticmethod
    def js_vars(player: Player):
        session = player.session
        p = player.participant
        time_left = round(p.dExpiry - time.time()) 
        return {
            'treatment'      :  player.sTreatment ,
            'round_number'   :  player.round_number ,
            'time_left'      :  time_left ,
            'bRequireFS'        : session.config['bRequireFS'],
            'bCheckFocus'       : session.config['bCheckFocus'],
            'dPixelRatio'       : p.dPixelRatio,
        }

    @staticmethod
    def before_next_page(player, timeout_happened):
        participant = player.participant
        participant.iOutFocus = int(participant.iOutFocus) + player.iFocusLost
        participant.iFullscreenChanges = int(participant.iFullscreenChanges) + player.iFullscreenChange
        participant.dTimeOutFocus = float(participant.dTimeOutFocus) + player.dFocusLostT

class Posting(Page):
    form_model = 'player' 
    form_fields = [
        'iImgPost1','iImgPost2','iImgPost3','iImgPost4','iImgPost5','iImgPost6',
        'iPost', 'sReward', 'dRTPost',
    ] 
 
    @staticmethod
    def vars_for_template(player):
        participant = player.participant
        
        if player.sReward == 'LR':
            vImages = participant.LRmemematrix 
        else:
            vImages = participant.HRmemematrix 

        # now we need to implement to take only last 10-20 so they are not the same
        # as in the first HR session 

        # if player.round_number < 10: 
        #     player.iImgPost1        = vImages[player.round_number + 9][0]
        #     player.iImgPost2        = vImages[player.round_number + 9][1]
        #     player.iImgPost3        = vImages[player.round_number + 9][2]
        #     player.iImgPost4        = vImages[player.round_number + 9][3]
        #     player.iImgPost5        = vImages[player.round_number + 9][4]
        #     player.iImgPost6        = vImages[player.round_number + 9][5]
        # else: 
        #     player.iImgPost1        = vImages[player.round_number - 1][0]
        #     player.iImgPost2        = vImages[player.round_number - 1][1]
        #     player.iImgPost3        = vImages[player.round_number - 1][2]
        #     player.iImgPost4        = vImages[player.round_number - 1][3]
        #     player.iImgPost5        = vImages[player.round_number - 1][4]
        #     player.iImgPost6        = vImages[player.round_number - 1][5]

        # choose a random number between 1 and 20, and not the same one

        if player.round_number < 20: 
            player.iImgPost1        = vImages[player.round_number - 1][0]
            player.iImgPost2        = vImages[player.round_number - 1][1]
            player.iImgPost3        = vImages[player.round_number - 1][2]
            player.iImgPost4        = vImages[player.round_number - 1][3]
            player.iImgPost5        = vImages[player.round_number - 1][4]
            player.iImgPost6        = vImages[player.round_number - 1][5]
        else: 
            player.iImgPost1        = vImages[player.round_number - 20][0]
            player.iImgPost2        = vImages[player.round_number - 20][1]
            player.iImgPost3        = vImages[player.round_number - 20][2]
            player.iImgPost4        = vImages[player.round_number - 20][3]
            player.iImgPost5        = vImages[player.round_number - 20][4]
            player.iImgPost6        = vImages[player.round_number - 20][5]
        
        return {
            'Image'     :  "".join([player.sReward,'/meme', str(player.iImgPost1), '.jpeg']) ,
            'Image2'    :  "".join([player.sReward,'/meme', str(player.iImgPost2), '.jpeg']) ,
            'Image3'    :  "".join([player.sReward,'/meme', str(player.iImgPost3), '.jpeg']) ,
            'Image4'    :  "".join([player.sReward,'/meme', str(player.iImgPost4), '.jpeg']) ,
            'Image5'    :  "".join([player.sReward,'/meme', str(player.iImgPost5), '.jpeg']) ,
            'Image6'    :  "".join([player.sReward,'/meme', str(player.iImgPost6), '.jpeg']) ,   
        }
    

    @staticmethod
    def js_vars(player: Player):
        session = player.session
        p = player.participant
        return {
            'ImageID'     :  player.iImgPost1 ,
            'Image2ID'    :  player.iImgPost2 ,
            'Image3ID'    :  player.iImgPost3 ,
            'Image4ID'    :  player.iImgPost4 ,
            'Image5ID'    :  player.iImgPost5 ,
            'Image6ID'    :  player.iImgPost6 ,
            'bRequireFS'        : session.config['bRequireFS'],
            'bCheckFocus'       : session.config['bCheckFocus'],
            'dPixelRatio'       : p.dPixelRatio,
    }


    @staticmethod
    def get_timeout_seconds(player):
        participant = player.participant
        return participant.dExpiry - time.time()

    @staticmethod
    def is_displayed(player):
        participant = player.participant
        time_left = participant.dExpiry - time.time()
        return time_left > 3


class Feedback(Page):
    form_model = 'player'
    form_fields = [
        'iLikes','iDislikes','dRTFeedback', 
    ] 

    @staticmethod
    def vars_for_template(player):
        if player.sReward == 'HR': 
            return {
                'img'        : player.iPost,
                'l'          : Constants.df.loc[player.iPost,"Likes"],
                'd'          : Constants.df.loc[player.iPost,"Dislikes"],
            }
        else:
            return {
                'img'        : player.iPost,
                'l'          : Constants.df2.loc[player.iPost,"Likes"],
                'd'          : Constants.df2.loc[player.iPost,"Dislikes"],
            }

    @staticmethod
    def js_vars(player: Player):
        session = player.session
        p = player.participant
        return {
            'treatment'   :  player.sTreatment ,
            'bRequireFS'        : session.config['bRequireFS'],
            'bCheckFocus'       : session.config['bCheckFocus'],
            'dPixelRatio'       : p.dPixelRatio,
        }

    @staticmethod
    def get_timeout_seconds(player):
        participant = player.participant
        return participant.dExpiry - time.time()

    @staticmethod
    def is_displayed(player):
        participant = player.participant
        time_left = participant.dExpiry - time.time()
        return time_left > 3


#! THINGS TO THINK
# prolific !!!!! 
# connection in last slide to real prolific link 
# check out why mouselog function does not work
# future fade in jquery for likes and dislikes appearing (the talking cloud thingie)

page_sequence = [ready, SplitScreen, Posting, Feedback]
