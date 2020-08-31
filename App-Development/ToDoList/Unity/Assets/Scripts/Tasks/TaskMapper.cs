using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TaskMapper : MonoBehaviour
{
    public int id;
    public Text taskName;
    public string description;
    public GameObject descriptionPanel;
    public Image infoButton;
    public GameObject checkBox;


    public void MoreInfoButton()
    {
        AppController.Instance.ShowDescriptionPanel(this);
    }

    public void CancelDestroyingTask()
    {
        checkBox.SetActive(false);
    }

    public void AcceptDestroyingTask()
    {
        checkBox.SetActive(true);
    }

    public void TaskActivityChange()
    {
        AppController.Instance.ShowAlertPopUp(id);
    }

}
