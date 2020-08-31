using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices.WindowsRuntime;
using UnityEngine;
using UnityEngine.UI;

[System.Serializable]
public class MenuController : MonoBehaviour
{
    #region SINGLETON
    private static MenuController menuControllerInstance;
    public static MenuController Instance
    {
        get { return menuControllerInstance; }
    }



    private void Awake()
    {
        if (menuControllerInstance == null)
        {
            menuControllerInstance = this;
            //DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }

        playerStats = new LoadSaveSystem();
        avatarSelected = "UFO_player";
    }
    #endregion 


    public Text highScore;
    public Text money;
    private LoadSaveSystem playerStats;
    public GameObject main, shop;
    public GameObject musicButton;
    public string avatarSelected;
    private AudioClip[] clips;
    [SerializeField] string[] clipsNames;
    public Button playButton;

    public LoadSaveSystem GetPlayerStats()
    {
        return playerStats;
    }
    // Start is called before the first frame update
    void Start()
    {
        playerStats.LoadJSON();
        

        highScore.text = "High Score" + "\n" + playerStats.GetHighScore().ToString();
        money.text = playerStats.GetPlayerMoney().ToString();


        playButton.GetComponent<Button>().onClick.AddListener(delegate {
            SceneController.instance.ChangeScene("Game");
        });


        clips = new AudioClip[clipsNames.Length];
        for (int i = 0; i < clips.Length; i++)
        {
            clips[i] = ClipsManager.Instance.GetClipByName(clipsNames[i]);
            if (i == 0)
            {
                if (!AudioManager.Instance.isMute)
                {
                    AudioManager.Instance.PlayBackground(clips[i], true);
                }
            }
            else
            {
                AudioManager.Instance.StopBackground(i);
            }
        }
       
        if (AudioManager.Instance.isMute)
        {
            AudioManager.Instance.StopAll();
            musicButton.GetComponent<SpriteObj>().ChangeSprite("musicDeact");
        }
        else
        {
            AudioManager.Instance.StopAll();
            AudioManager.Instance.PlayBackground(clips[0], true);
            musicButton.GetComponent<SpriteObj>().ChangeSprite("musicAct");
        }
    }


    public void UpdateMoneyUI()
    {
        money.text = playerStats.GetPlayerMoney().ToString();
    }

    public void ChangeToShopUI()
    {
        shop.SetActive(true);
        main.SetActive(false);
        AudioManager.Instance.StopBackground(0);
        if (!AudioManager.Instance.isMute)
        {
            AudioManager.Instance.PlayBackground(clips[1], true, 1);//1
        }
            
    }

    public void ReturnToMain()
    {
        shop.SetActive(false);
        main.SetActive(true);
        AudioManager.Instance.StopBackground(1);
        if (!AudioManager.Instance.isMute)
        {
            AudioManager.Instance.PlayBackground(clips[0], true, 0);//0
        }
    }

    public void ChangeMusicStatus()
    {
        if (AudioManager.Instance.isMute)
        {
            musicButton.GetComponent<SpriteObj>().ChangeSprite("musicAct");
            AudioManager.Instance.isMute = false;
            AudioManager.Instance.ToggleMuteAll(false);

            if (main.active == true)
            {
                AudioManager.Instance.PlayBackground(clips[0], true, 0);
            }
        }
        else
        {
            musicButton.GetComponent<SpriteObj>().ChangeSprite("musicDeact");
            AudioManager.Instance.isMute = true;
            AudioManager.Instance.ToggleMuteAll(true);
        }
    }

    public void SelectPlayer(string avatar)
    {
        if (ShopController.Instance.CanSelectavatar(avatar))
        {
            avatarSelected = avatar;
        }
    }

    public string GetAvatarSelected()
    {
        return avatarSelected;
    }

    public int GetPLayerMoney()
    {
        return playerStats.GetPlayerMoney();
    }

    public void SetPlayerMoney(int newAmount)
    {
        playerStats.SetPlayerMoney(newAmount);
    }

    public void QuitGame()
    {
        Application.Quit();
    }
}


