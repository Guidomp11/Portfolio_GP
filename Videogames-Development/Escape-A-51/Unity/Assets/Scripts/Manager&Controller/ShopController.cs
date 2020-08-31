using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.UI;



public class ShopController : MonoBehaviour
{
    #region SINGLETON

    private static ShopController shopControllerInstance;
    public static ShopController Instance
    {
        get { return shopControllerInstance; }
    }



    private void Awake()
    {
        if (shopControllerInstance == null)
        {
            shopControllerInstance = this;
            //DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }

    #endregion

    [SerializeField] private int[] avatars;
    [SerializeField] private List<Button> avatarsOnSale = new List<Button>();
    private int playerMoney;
    private int _index;
    public UnlockedAvatar unlockedAvatars;


    private void Start()
    {
        LoadJSON();
        ConfigPlayer();
    }

    private void SaveOnJSON()
    {
        string avatarsList = JsonUtility.ToJson(unlockedAvatars);

        File.WriteAllText(Application.persistentDataPath + "/UnlockedAvatars.json", avatarsList);
    }

    public void LoadJSON()
    {
        string path = Application.persistentDataPath + "/UnlockedAvatars.json";

        if (!File.Exists(path))
        {
            TextAsset jsonTxt = Resources.Load<TextAsset>("UnlockedAvatars");
            File.WriteAllText(path, jsonTxt.text);
        }

        string jsonString = File.ReadAllText(path);
        unlockedAvatars = JsonUtility.FromJson<UnlockedAvatar>(jsonString);
    }

    private void ConfigPlayer()
    {
        for (int i = 0; i < avatarsOnSale.Count; i++)
        {
            if (unlockedAvatars.avatars.ufoArr[i] == "unlocked")
            {
                avatarsOnSale[i].gameObject.SetActive(false);
            }
        }
    }


    public void GetAvatarID(int id)
    {
        _index = id;
    }
    public void PurchaseAvatar(int amount)
    {
        playerMoney = MenuController.Instance.GetPLayerMoney();
        if (amount <= playerMoney)
        {
            AvatarPurchased();
            unlockedAvatars.avatars.ufoArr[_index] = "unlocked";
            SaveOnJSON();
            playerMoney -= amount;
            MenuController.Instance.SetPlayerMoney(-amount);
            MenuController.Instance.UpdateMoneyUI();
            MenuController.Instance.GetPlayerStats().SaveOnJSON();
        }
    }

    public void AvatarPurchased()
    {
        if (avatarsOnSale.Count > 0)
        {
            avatarsOnSale[_index].gameObject.SetActive(false);
        }
    }

    //PARA SBAER SI EL JUGADOR TIENE O NO EL AVATAR
    public bool CanSelectavatar(string id)
    {
        for (int i = 0; i < avatarsOnSale.Count; i++)
        {
            if (avatarsOnSale[i].name == id && unlockedAvatars.avatars.ufoArr[i] == "unlocked")
            {
                return true;
            }
        }
        return false;
    }
}

[System.Serializable]
public class UnlockedAvatar
{
    public AvatarsData avatars;
}


[System.Serializable]
public class AvatarsData
{
    public string[] ufoArr;
}
