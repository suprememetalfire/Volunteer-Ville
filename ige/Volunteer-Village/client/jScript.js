	function click()
	{
		if( clicked )
		{
			changeVisibility();
			clicked = false;
		}
		else
		{
			resetElement();
			clicked = true;
		}
	}
			
	function changeVisibility()
	{
		//document.getElementById("igePlayerDiv").style.visibility="hidden";
		document.getElementById("igeQuestLog").style.visibility="hidden";
		document.getElementById("igeQuestLog2").style.visibility="hidden";
	}

	function resetElement()
	{
		//document.getElementById("igePlayerDiv").style.visibility="visible";
		document.getElementById("igeQuestLog").style.visibility="visible";
		document.getElementById("igeQuestLog2").style.visibility="visible";
	}
		
	function showBadges()
	{
		if( show )
		{
			document.getElementById("igeBadgesDiv").style.visibility="hidden";
			document.getElementById("uiMenuButton_osd2").style.visibility="hidden";
			show = false;
		}
		else
		{
			document.getElementById("igeBadgesDiv").style.visibility="visible";
			document.getElementById("uiMenuButton_osd2").style.visibility="visible";
			show = true;
		}
	}
			
	function revealBadges()
	{
		if( igeGame.taskList[0] >= 1 && show )
		{
			document.getElementById("uiBadgeEighteen").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeEighteen").style.visibility="hidden";
		}

		if( igeGame.taskList[2] >= 1 && show )
		{
			document.getElementById("uiBadgeSeventeen").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeSeventeen").style.visibility="hidden";
		}

		if( igeGame.taskList[18] >= 1 && show )
		{
			document.getElementById("uiBadgeNine").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeNine").style.visibility="hidden";
		}

		if( igeGame.taskList[6] >= 5 && show )
		{
			document.getElementById("uiBadgeThree").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeThree").style.visibility="hidden";
		}

		if( igeGame.taskList[7] >= 5 && show )
		{
			document.getElementById("uiBadgeFive").style.visibility="visible";
			document.getElementById("uiBadgeTen").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeFive").style.visibility="hidden";
			document.getElementById("uiBadgeTen").style.visibility="hidden";
		}				

		if( ( igeGame.taskList[10] + igeGame.taskList[17] >= 5 ) && show )
		{
			document.getElementById("uiBadgeTwo").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeTwo").style.visibility="hidden";
		}

		if( igeGame.taskList[11] >= 1 && show )
		{
			document.getElementById("uiBadgeSeven").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeSeven").style.visibility="hidden";
		}

		if( igeGame.taskList[12] >= 1 && show )
		{
			document.getElementById("uiBadgeTwelve").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeTwelve").style.visibility="hidden";
		}

		if( igeGame.taskList[12] + igeGame.taskList[13] + igeGame.taskList[14] >= 10 && show )
		{
			document.getElementById("uiBadgeTwentyNine").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeTwentyNine").style.visibility="hidden";
		}

		if( igeGame.taskList[13] >= 1 && show )
		{
			document.getElementById("uiBadgeThirteen").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeThirteen").style.visibility="hidden";
		}

		if( igeGame.taskList[14] >= 1 && show )
		{
			document.getElementById("uiBadgeFourteen").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeFourteen").style.visibility="hidden";
		}

		if( ( igeGame.taskList[17] + igeGame.taskList[18] + igeGame.taskList[19] >= 5 ) && show )
		{
			document.getElementById("uiBadgeFour").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeFour").style.visibility="hidden";
		}

		if( igeGame.taskList[19] >= 1 && show )
		{
			document.getElementById("uiBadgeEight").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeEight").style.visibility="hidden";
		}

		if( igeGame.taskList[20] >= 1 && show )
		{
			document.getElementById("uiBadgeEleven").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeEleven").style.visibility="hidden";
		}

		if( igeGame.taskList[21] >= 1 && show )
		{
			document.getElementById("uiBadgeTwentyThree").style.visibility="visible";
			document.getElementById("uiBadgeTwentyFive").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeTwentyThree").style.visibility="hidden";
			document.getElementById("uiBadgeTwentyFive").style.visibility="hidden";
		}

		if( igeGame.taskList[22] >= 1 && show )
		{
			document.getElementById("uiBadgeTwentyEight").style.visibility="visible";					
		}
		else
		{
			document.getElementById("uiBadgeTwentyEight").style.visibility="hidden";
		}

		if( igeGame.taskList[24] >= 1 && show )
		{
			document.getElementById("uiBadgeFifteen").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeFifteen").style.visibility="hidden";
		}
	
		if( igeGame.taskList[24] + igeGame.taskList[25] >= 10 && show )
		{
			document.getElementById("uiBadgeTwentyFour").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeTwentyFour").style.visibility="hidden";
		}

		if( igeGame.taskList[25] >= 1 && show )
		{
			document.getElementById("uiBadgeSixteen").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeSixteen").style.visibility="hidden";
		}

		if( igeGame.taskList[27] >= 5 && show )
		{
			document.getElementById("uiBadgeOne").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeOne").style.visibility="hidden";
		}
	
		if( igeGame.taskList[27] >= 1 && show )
		{
			document.getElementById("uiBadgeSix").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeSix").style.visibility="hidden";
		}

		if( igeGame.badgeScore >= 5 && show )
		{
			document.getElementById("uiBadgeNineteen").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeNineteen").style.visibility="hidden";
		}

		if( igeGame.badgeScore >= 10 && show )
		{
			document.getElementById("uiBadgeTwenty").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeTwenty").style.visibility="hidden";
		}
		
		if( igeGame.badgeScore >= 50 && show )
		{
			document.getElementById("uiBadgeTwentyOne").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeTwentyOne").style.visibility="hidden";
		}

		if( igeGame.badgeScore >= 100 && show )
		{
			document.getElementById("uiBadgeTwentyTwo").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeTwentyTwo").style.visibility="hidden";
		}

		if( igeGame.community >= 100 && show )
		{
			document.getElementById("uiBadgeTwentySix").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeTwentySix").style.visibility="hidden";
		}

		if( igeGame.boolAllTasks && show )
		{
			document.getElementById("uiBadgeTwentySeven").style.visibility="visible";
		}
		else
		{
			document.getElementById("uiBadgeTwentySeven").style.visibility="hidden";
		}
	}
