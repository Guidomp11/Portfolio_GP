using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SocialPlatforms.Impl;
using UnityEngine.UI;

public class LevelController : MonoBehaviour
{
    #region SINGLETON
    private static LevelController levelControlletInstance;
    public static LevelController Instance
    {
        get { return levelControlletInstance; }
    }

    private void Awake()
    {
        if (levelControlletInstance == null)
        {
            levelControlletInstance = this;
        }
        else
        {
            Destroy(gameObject);
        }

        
        Instantiate(playerRef, spawnPoint);

    }
    #endregion //directicva de pre procesamiento
    
    private Vector2 platformSize;//obtener por codigo -> se debe saber los bounds (se obtiene el tamaño)
    private Vector2 platformLastPos;

    private bool playerLose = false;
    [SerializeField] private int platformsInSight;//plataformas que se ven
    public Player playerRef;
    [SerializeField]private Transform spawnPoint;
    public GameObject musicButton;
    public GameObject pauseButton;
    private AudioClip[] levelSounds;
    [SerializeField] private string[] clipsNames;
    public Button homeButton;
    public GameObject losePanel;
    public Button goHomeButton;
    public Button restartLevel;
    string avatar;

    private float distanceTraveled;
    private int score = 0;

    private void Start()
    {
        playerRef = FindObjectOfType<Player>();
        InitializePlatforms();

        SetAudio();

        SetButtons();
    }
    private void Update()
    {
        UIController.Instance.UpdateScore(playerRef.GetScore());
    }

    private void SetAudio()
    {
        levelSounds = new AudioClip[clipsNames.Length];
        for (int i = 0; i < levelSounds.Length; i++)
        {
            levelSounds[i] = ClipsManager.Instance.GetClipByName(clipsNames[i]);
        }

        if (AudioManager.Instance.isMute)
        {
            AudioManager.Instance.StopAll();
            musicButton.GetComponent<SpriteObj>().ChangeSprite("musicDeact");
        }
        else
        {
            AudioManager.Instance.StopAll();
            AudioManager.Instance.PlayBackground(levelSounds[0], true);
            musicButton.GetComponent<SpriteObj>().ChangeSprite("musicAct");
        }
    }

    private void SetButtons()
    {
        homeButton.onClick.AddListener(delegate {
            AudioManager.Instance.StopAll();
            if (AudioManager.Instance.isMute == false)
            {
                AudioManager.Instance.PlayBackground(ClipsManager.Instance.GetClipByName("Menu_SoundTrack"), true);
            }
            else
            {
                AudioManager.Instance.isMute = true;
            }
            UIController.Instance.PauseGame(false);
            SceneController.instance.ChangeScene("Menu");
        });
    }

    public string Setplayer()
    {
        avatar = MenuController.Instance.avatarSelected;
        return avatar;
    }

    void InitializePlatforms()
    {
        Vector2 initialPosition = new Vector2(0, 0);
        
        for (int i = 0; i < platformsInSight; i++)
        {
            GameObject go = RequestPlatform();
            //GameObject go = RequestRandomPlatform();
            platformSize = go.GetComponent<BoxCollider2D>().bounds.size;
            platformSize.y = 0;//PARA EVITAR QUE SEA UN ESCALON -> todo en una misma linea
            go.transform.position = initialPosition + i * platformSize;
            platformLastPos = go.transform.position;
            //go.GetComponent<Platform>().ActivateObstacles();
            if(i > 1) go.GetComponent<Platform>().ActivateObstacle();

        }
    }
    public void ActivateNextPlatform()
    {
        Platform platform = RequestPlatform().GetComponent<Platform>();

        platformSize = platform.GetComponent<BoxCollider2D>().bounds.size;
        platformSize.y = 0;//PARA EVITAR QUE SEA UN ESCALON -> todo en una misma linea
        platform.transform.position = platformLastPos + platformSize;
        platformLastPos = platform.transform.position;

        platform.ActivateObstacle();
    }
    private ObstacleTypes GetObstacle(int index)
    {
        ObstacleTypes obstacleEnum;
        switch (index)
        {
            case 0:
                obstacleEnum = ObstacleTypes.HorizontalLaser;
                break;
            case 1:
                obstacleEnum = ObstacleTypes.BoltSphere;
                break;
            case 2:
                obstacleEnum = ObstacleTypes.Projectile;
                break;
            default:
                obstacleEnum = ObstacleTypes.BoltSphere;
                break;
        }
        return obstacleEnum;
    }
    //OBSTACULO ESPECIFICO
    public GameObject DeterminateObstacle(int index)
    {
        GameObject go;
        int result = 0;
        switch (index)
        {
            case 0:
            case 1:
            case 2:
                result = UnityEngine.Random.Range(0, 2);
                if (result == 0)
                {
                    go = PoolManager.Instance.RequestObject("HorizontalLaser");
                }
                else
                {
                    go = PoolManager.Instance.RequestObject("ElectricWall");
                }
                break;
            case 3:
            case 4:
                result = UnityEngine.Random.Range(0, 2);
                if (result == 0)
                {
                    go = PoolManager.Instance.RequestObject("BoltSphere");
                }
                else
                {
                    go = PoolManager.Instance.RequestObject("ElectricWall");
                    if (index == 4)
                    {
                        Quaternion rot = go.transform.rotation;
                        rot.z = 115;
                        go.transform.rotation = rot;
                    }
                }
                break;
            case 5:
            case 6:
            case 7:
                result = UnityEngine.Random.Range(0, 2);
                
                if (result == 0)
                {
                    go = PoolManager.Instance.RequestObject("HorizontalLaser");
                    Quaternion rot = go.transform.rotation;
                    rot.z = 180;
                    go.transform.rotation = rot;
                }
                else
                {
                    go = PoolManager.Instance.RequestObject("ElectricWall");
                    if (index == 7)
                    {
                        Quaternion rot = go.transform.rotation;
                        rot.z = 180;
                        go.transform.rotation = rot;
                    }
                }
                break;
            case 8:
                go = PoolManager.Instance.RequestObject("BoltSphere");
                break;
            default:
                go = PoolManager.Instance.RequestObject("Projectile");
                break;
        }
        return go;
    }
    private GameObject RequestPlatform()
    {
        int index = GetEnviroment();

        string poolType = Enum.GetName(typeof(PlatformsType), index);

        Debug.Log("POOL TYPE: " + poolType);

        GameObject platform = PoolManager.Instance.RequestObject(poolType);

        return platform;
    }
    private int GetEnviroment()
    {
        float dist = playerRef.GetDistanceTraveled();
        //1000, 2000, 3000
        
        if (dist < 1000f)
        {
            return 0;
        }
        if (dist < 1500f)
        {
            return 1;
        }
        if (dist < 2000f)
        {
            return 2;
        }
        if (dist < 2500f)
        {
            return 1;
        }
        if (dist < 3000f)
        {
            return 3;
        }
        return 1;
    }
    public GameObject RequestRandomMoneyFigure()
    {
        MoneyGroup randomRange = (MoneyGroup)(UnityEngine.Random.Range(0, Enum.GetNames(typeof(MoneyGroup)).Length));

        string poolType = Enum.GetName(typeof(MoneyGroup), randomRange);

        return PoolManager.Instance.RequestObject(poolType);
    }
    public void ToggleMusic()
    {
        if (AudioManager.Instance.isMute)
        {
            AudioManager.Instance.ToggleMuteAll(false);
            musicButton.GetComponent<SpriteObj>().ChangeSprite("musicAct");
        }
        else
        {
            AudioManager.Instance.ToggleMuteAll(true);
            musicButton.GetComponent<SpriteObj>().ChangeSprite("musicDeact");
        }
    }
    public void PlayerLose(Player playerRef)
    {
        if (!playerLose)
        {
            playerLose = true;


            pauseButton.SetActive(false);
            playerRef.explosion.SetActive(true);
            playerRef.isAlive = false;
            losePanel.SetActive(true);

            //resetLevel button antes
            restartLevel.onClick.AddListener(delegate {
                AudioManager.Instance.StopAll();
                if (AudioManager.Instance.isMute == false)
                {
                    AudioManager.Instance.PlayBackground(ClipsManager.Instance.GetClipByName("Base_SoundTrack"), true);
                }
                else
                {
                    AudioManager.Instance.isMute = true;
                }
                UIController.Instance.PauseGame(false);
                SceneController.instance.ChangeScene("Game");
            });

            goHomeButton.onClick.AddListener(delegate {
                AudioManager.Instance.StopAll();
                if (AudioManager.Instance.isMute == false)
                {
                    AudioManager.Instance.PlayBackground(ClipsManager.Instance.GetClipByName("Menu_SoundTrack"), true);
                }
                else
                {
                    AudioManager.Instance.isMute = true;
                }
                UIController.Instance.PauseGame(false);
                SceneController.instance.ChangeScene("Menu");
            });
        }
    }
    public void QuitGame()
    {
        Application.Quit();
    }

    /*
    private GameObject RequestRandomPlatform()
    {
        PlatformsType randomRange = (PlatformsType)(UnityEngine.Random.Range(0, Enum.GetNames(typeof(PlatformsType)).Length));

        string poolType = Enum.GetName(typeof(PlatformsType), randomRange);

        return PoolManager.Instance.RequestObject(poolType);
    }
    public GameObject RequestRandomObstacle()
    {
        ObstacleTypes randomRange = (ObstacleTypes)(UnityEngine.Random.Range(0, Enum.GetNames(typeof(ObstacleTypes)).Length));

        string poolType = Enum.GetName(typeof(ObstacleTypes), randomRange);

        return PoolManager.Instance.RequestObject(poolType);
    }
    public GameObject RequestObstacle(int index)
    {
        ObstacleTypes obstacleEnum = GetObstacle(index);
        string poolType = Enum.GetName(typeof(ObstacleTypes), obstacleEnum);

        return PoolManager.Instance.RequestObject(poolType);
    }
    */
}
