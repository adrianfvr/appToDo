import { Component } from '@angular/core';
import { ITask } from '../interfaces/ITask';
import { AlertController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tasks: ITask[] = [
    {
      id: 1,
      title: 'Hello',
      description: 'lorem impus dor',
      done: false,
      iconName: 'checkmark-circle',
    },
    {
      id: 1,
      title: 'Hello',
      description: 'lorem impus dor',
      done: false,
      iconName: 'checkmark-circle',
    },
    {
      id: 1,
      title: 'Hello',
      description: 'lorem impus dor',
      done: false,
      iconName: 'checkmark-circle',
    },
    {
      id: 1,
      title: 'Hello',
      description: 'lorem impus dor',
      done: false,
      iconName: 'checkmark-circle',
    },
    {
      id: 1,
      title: 'Hello',
      description: 'lorem impus dor',
      done: false,
      iconName: 'checkmark-circle',
    },
  ];

  constructor(private _AlertController: AlertController) {}

  async open() {
    const alert = await this._AlertController.create({
      header: 'Add New Task',
      inputs: [
        {
          type: 'text',
          name: 'title',
          placeholder: 'Title',
        },
        {
          type: 'textarea',
          name: 'description',
          placeholder: 'Description',
        },
      ],
      buttons: [
        {
          text: 'Add',
          handler: async (data) => {
            if (!data.title.trim()) {
              // Verifica si el título está vacío
              const errorAlert = await this._AlertController.create({
                header: 'Error',
                message: 'You must enter a title. ',
                buttons: ['OK'],
              });
              await errorAlert.present();
              return false;
            }

            this.tasks.push({
              id: this.tasks.length + 1,
              title: data.title,
              description: data.description,
              done: false,
              iconName: 'checkmark-circle',
            });
            return true;
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  toggleTaskDone = (task: ITask, slidingItem: IonItemSliding) => {
    task.done = !task.done;
    task.iconName = task.done ? 'ban' : 'checkmark-circle';
    slidingItem.close();
  };

  deleteTask = (task: ITask) => {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  };

  updateTask = async (task: ITask) => {
    const alert = await this._AlertController.create({
      header: 'Edit Task',
      inputs: [
        {
          type: 'text',
          name: 'title',
          value: task.title,
        },
        {
          type: 'text',
          name: 'description',
          value: task.description,
        },
      ],
      buttons: [
        {
          text: 'Update',
          handler: (data) => {
            this.tasks[this.tasks.indexOf(task)].title = data.title;
            this.tasks[this.tasks.indexOf(task)].description = data.description;
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  };
}
