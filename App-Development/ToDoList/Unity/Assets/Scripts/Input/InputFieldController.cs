using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class InputFieldController : MonoBehaviour
{
    #region SINGLETON

    private static InputFieldController _instance;
    public static InputFieldController Instance
    {
        get { return _instance; }
    }

    void Awake()
    {
        if (_instance == null)
        {
            _instance = this;
        }
    }
    #endregion

    [SerializeField] private int inputID;
    [SerializeField] private string myInfo;

    public void SendInfoToController()
    {
        myInfo = this.gameObject.GetComponent<InputField>().text;
        AppController.Instance.SetTaskInfo(inputID, myInfo);
    }

    public void ResetInfo()
    {
        myInfo = "";
    }
}
